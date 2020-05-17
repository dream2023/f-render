<template>
  <div class="app-main-left-projects">
    <div class="search-comps">
      <el-input placeholder="输入关键字进行过滤" v-model="keyword"> </el-input>
    </div>
    <el-button
      @click="beforeCreateProject"
      class="create-project-btn"
      type="primary"
      size="mini"
      >新建工程</el-button
    >
    <el-tree
      :data="computedProjectList"
      default-expand-all
      ref="tree"
      highlight-current
      :current-node-key="currentNodeKey"
      node-key="key"
      :filter-node-method="filterNode"
      :props="{ children: 'formList', label: 'name' }"
    >
      <span class="custom-tree-node" slot-scope="{ node }">
        <span
          class="custom-tree-node-label"
          @click="handleCommand('select', node)"
          >{{ node.label }}</span
        >
        <el-dropdown @command="handleCommand($event, node)">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="node.level === TreeLevel.PROJECT"
              command="create"
              >新建表单</el-dropdown-item
            >
            <el-dropdown-item command="update">编辑名称</el-dropdown-item>
            <el-dropdown-item command="delete" style="color: #F56C6C"
              >删除{{
                node.level === TreeLevel.PROJECT ? "工程" : "表单"
              }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>

    <ele-form-dialog
      :title="dialogTitle"
      v-model="formData"
      :formDesc="formDesc"
      node-key="key"
      :dialogAttrs="{
        'append-to-body': true
      }"
      @request="handleEdit"
      :visible.sync="isShowDialog"
    />
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "AppMainLeftProjects",
  data() {
    return {
      // 搜索名字
      keyword: "",
      // tree的level
      TreeLevel: {
        PROJECT: 1,
        FORM: 2
      },
      // 表单 or 工程
      EditType: {
        PROJECT: 1,
        FORM: 2
      },
      // 当前正在编辑的是表单 or 工程
      editingType: null,
      // 表单描述
      formDesc: {},
      // 表单数据
      formData: {},
      // 用于判断是新增还是更新
      isUpdate: false,
      // 是否显示弹窗
      isShowDialog: false,
      // 当前正在编辑的工程索引
      currentEditProjectIndex: null,
      // 当前正在编辑的表单的index
      currentEditFormIndex: null
    };
  },
  computed: {
    ...mapState(["projectList", "currentFormIndex", "currentProjectIndex"]),
    // tree key: project 名字 + form 名字
    computedProjectList() {
      return _.cloneDeep(this.projectList).map(project => {
        project.key = project.name;
        project.formList = project.formList.map(form => {
          form.key = project.name + "-" + form.name;
          return form;
        });
        return project;
      });
    },
    // 当前激活的 node 的 key
    currentNodeKey() {
      if (this.currentFormIndex !== null && this.currentProjectIndex !== null) {
        return this.computedProjectList[this.currentProjectIndex].formList[
          this.currentFormIndex
        ].key;
      } else {
        return null;
      }
    },
    // 当前弹窗的标题
    dialogTitle() {
      return `${this.isUpdate ? "更新" : "新建"}${
        this.editingType === this.EditType.PROJECT ? "工程" : "表单"
      }`;
    }
  },
  watch: {
    keyword(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 搜索过滤 node 的函数
    filterNode(keyword, data) {
      if (!keyword) return true;
      return data.name.indexOf(keyword) !== -1;
    },
    /**
     * 基础表单描述，用于生成 新增表单 和 新增工程的弹窗
     * @param nameArr 用于重复性校检
     * @param exclude 用于更新时，不校检自身
     */
    baseFormDesc(nameArr, exclude) {
      return {
        name: {
          type: "input",
          label: "名称",
          required: true,
          rules: {
            validator(rule, value, callback) {
              if (nameArr.includes(value)) {
                return exclude === value
                  ? callback()
                  : callback(new Error("名称重复"));
              } else {
                callback();
              }
            }
          }
        }
      };
    },
    // 点击新增工程按钮
    beforeCreateProject() {
      this.editingType = this.EditType.PROJECT;

      this.formDesc = this.baseFormDesc(
        this.computedProjectList.map(project => project.name)
      );
      this.formData = {};
      this.isUpdate = false;
      this.isShowDialog = true;
    },
    // 处理操作
    handleCommand(command, node) {
      // 获取工程索引
      const getProjectIndexByName = name => {
        return this.projectList.findIndex(project => project.name === name);
      };
      // 判断是否为 PROJECT 相关操作
      if (node.level === this.TreeLevel.PROJECT) {
        this.currentEditProjectIndex = getProjectIndexByName(node.key);

        switch (command) {
          // 删除工程
          case "delete":
            this.deleteProject(node);
            break;
          // 更新工程
          case "update":
            this.isUpdate = true;
            this.beforeUpdateProject(node);
            break;
          // 创建表单
          case "create":
            this.beforeCreateForm();
            break;
        }
      } else if (node.level === this.TreeLevel.FORM) {
        // 当前编辑的为 FORM 时
        this.currentEditProjectIndex = getProjectIndexByName(
          node.parent.data.name
        );
        // 通过名称获取当前编辑表单索引
        this.currentEditFormIndex = this.computedProjectList[
          this.currentEditProjectIndex
        ].formList.findIndex(form => form.key === node.key);

        switch (command) {
          case "delete":
            // 删除表单
            this.deleteForm();
            break;
          case "update":
            // 更新表单
            this.isUpdate = true;
            this.beforeUpdateForm(node);
            break;
          case "select":
            // 选择 当前激活的表单
            // 如果当前即选中的, 则无需选择
            if (
              this.currentEditProjectIndex === this.currentProjectIndex &&
              this.currentEditFormIndex === this.currentFormIndex
            ) {
              return;
            }
            this.selectForm();
            break;
        }
      }
    },
    // 删除工程
    async deleteProject(node) {
      if (node.childNodes.length) {
        try {
          await this.$confirm("此工程下存在表单, 您确定要删除吗?!", "提示", {
            type: "warning"
          });
          this.$store.commit(
            "deleteProjectByIndex",
            this.currentEditProjectIndex
          );
        } catch {
          // DO NOTHING
        }
      } else {
        this.$store.commit(
          "deleteProjectByIndex",
          this.currentEditProjectIndex
        );
      }
    },
    // 更新工程前
    beforeUpdateProject(node) {
      this.editingType = this.EditType.PROJECT;

      this.formDesc = this.baseFormDesc(
        this.computedProjectList.map(project => project.name),
        node.data.name
      );
      this.formData = this.computedProjectList[this.currentEditProjectIndex];
      this.isShowDialog = true;
    },
    // 创建表单前
    beforeCreateForm() {
      this.editingType = this.EditType.FORM;

      this.formDesc = this.baseFormDesc(
        this.computedProjectList[this.currentEditProjectIndex].formList.map(
          form => form.name
        )
      );
      this.formData = {};
      this.isShowDialog = true;
    },
    // 删除表单
    async deleteForm() {
      try {
        await this.$confirm("您确定要删除此表单吗?!", "提示", {
          type: "warning"
        });
        this.$store.commit("deleteFormByIndex", {
          projectIndex: this.currentEditProjectIndex,
          formIndex: this.currentEditFormIndex
        });
      } catch {
        // NO NOTHING
      }
    },

    // 更新表单前
    beforeUpdateForm(node) {
      this.editingType = this.EditType.FORM;

      this.formDesc = this.baseFormDesc(
        this.computedProjectList[this.currentEditProjectIndex].formList.map(
          form => form.name
        ),
        node.data.name
      );
      this.formData = this.computedProjectList[
        this.currentEditProjectIndex
      ].formList[this.currentEditFormIndex];
      this.isShowDialog = true;
    },
    // 选择表单
    async selectForm() {
      const updateSelect = () => {
        this.$store.commit("updateProjectIndex", this.currentEditProjectIndex);
        this.$store.commit("updateFormIndex", this.currentEditFormIndex);
      };

      if (this.currentFormIndex === null) {
        updateSelect();
      } else {
        try {
          await this.$confirm("您确定要切换表单吗?!", "提示", {
            type: "warning"
          });
          updateSelect();
        } catch {
          // DO NOTHING
        }
      }
    },
    // 弹窗点击缺点按钮
    handleEdit(data) {
      if (this.editingType === this.EditType.PROJECT) {
        this.handleEditProject(data);
      } else {
        this.handleEditForm(data);
      }
    },
    // 编辑工程 ( 更新 / 创建 )
    handleEditProject(data) {
      if (this.isUpdate) {
        this.updateProject(data);
      } else {
        this.createProject(data);
      }
      this.isShowDialog = false;
      this.isUpdate = false;
    },
    // 创建工程
    createProject(data) {
      this.$store.commit("createProject", data);
      this.$message.success("新增成功");
    },
    // 更新工程
    updateProject(data) {
      this.$store.commit("updateProject", {
        projectIndex: this.currentEditProjectIndex,
        project: data
      });
      this.$message.success("更新成功");
    },
    // 编辑表单 ( 更新 / 创建 )
    handleEditForm(data) {
      this.isUpdate ? this.updateForm(data) : this.createForm(data);
      this.isShowDialog = false;
      this.isUpdate = false;
    },

    // 创建表单
    createForm(data) {
      this.$store.commit("createForm", {
        projectIndex: this.currentEditProjectIndex,
        form: data
      });
      this.$message.success("新增成功");
    },

    // 更新表单
    updateForm(data) {
      this.$store.commit("updateForm", {
        projectIndex: this.currentEditProjectIndex,
        formIndex: this.currentEditFormIndex,
        form: data
      });
      this.$message.success("更新成功");
    }
  }
};
</script>

<style lang="scss">
.app-main-left-projects {
  line-height: 1.5em;
  height: 100%;

  .search-comps {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .create-project-btn {
    margin: 8px 10px;
  }

  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    width: 100%;
    align-items: center;
    font-size: 14px;

    .custom-tree-node-label {
      flex: 1;
    }

    .operation-btns {
      display: none;
    }

    &:hover {
      .operation-btns {
        display: block;
      }
    }
  }
}
</style>
