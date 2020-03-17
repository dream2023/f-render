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
      :data="projectList"
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

<script lang="ts">
import store from "@/store";
import {
  ref,
  toRefs,
  createComponent,
  watch,
  computed
} from "@vue/composition-api";
import { Message, MessageBox } from "element-ui";
import _ from "lodash-es";

export default createComponent({
  name: "AppMainLeftProjects",
  setup() {
    // tree的level
    enum TreeLevel {
      PROJECT = 1,
      FORM = 2
    }
    enum EditType {
      PROJECT = 1,
      FORM = 2
    }

    const { projectList, currentFormIndex, currentProjectIndex } = toRefs(
      store.state
    );

    // 翻转, 后创建的放到前面
    // 表单名字加上层级
    const computedProjectList = computed(() =>
      _.cloneDeep(projectList.value).map(project => {
        project.key = project.name;
        project.formList = project.formList.map(form => {
          form.key = project.name + "-" + form.name;
          return form;
        });
        return project;
      })
    );

    // 基础表单描述
    const baseFormDesc = (nameArr: string[], exclude?: string) => ({
      name: {
        type: "input",
        label: "名称",
        required: true,
        rules: {
          validator(rule: any, value: string, callback: AnyFunction) {
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
    });

    // 表单描述
    const formDesc = ref({});
    // 表单数据
    const formData = ref({});
    // 是否显示探弹窗
    const isShowDialog = ref(false);
    // 用于判断是新增还是更新
    const isUpdate = ref(false);
    // 用于判断当前正在编辑的是表单还是工程
    const editingType = ref(EditType.PROJECT);

    // 当前正在编辑的工程索引
    const currentEditProjectIndex = ref(0);

    // 通过名称获取工程索引
    function getProjectIndexByName(name: string): number {
      return projectList.value.findIndex(project => project.name === name);
    }

    // 创建工程前
    const beforeCreateProject = () => {
      editingType.value = EditType.PROJECT;

      formDesc.value = baseFormDesc(
        computedProjectList.value.map(project => project.name)
      );
      formData.value = {};
      isUpdate.value = false;
      isShowDialog.value = true;
    };

    // 创建工程
    const createProject = (data: any) => {
      store.commit("createProject", data);
      Message.success("新增成功");
    };

    // 更新工程前
    const beforeUpdateProject = (node: any) => {
      editingType.value = EditType.PROJECT;

      formDesc.value = baseFormDesc(
        computedProjectList.value.map(project => project.name),
        node.data.name
      );
      formData.value = computedProjectList.value[currentEditProjectIndex.value];
      isShowDialog.value = true;
    };

    // 更新工程
    const updateProject = (data: any) => {
      store.commit("updateProject", {
        projectIndex: currentEditProjectIndex.value,
        project: data
      });
      Message.success("更新成功");
    };

    // 编辑工程 ( 更新 / 创建 )
    const handleEditProject = (data: any) => {
      isUpdate.value ? updateProject(data) : createProject(data);
      isShowDialog.value = false;
      isUpdate.value = false;
    };

    // 删除工程
    const deleteProject = async (node: any) => {
      if (node.childNodes.length) {
        try {
          await MessageBox.confirm(
            "此工程下存在表单, 您确定要删除吗?!",
            "提示",
            {
              type: "warning"
            }
          );
          store.commit("deleteProjectByIndex", currentEditProjectIndex.value);
        } catch {
          // DO NOTHING
        }
      } else {
        store.commit("deleteProjectByIndex", currentEditProjectIndex.value);
      }
    };

    // 当前正在编辑的表单的index
    const currentEditFormIndex = ref(0);

    // 通过名称获取当前编辑表单索引
    function getFormIndexByName(projectIndex: number, name: string) {
      const formIndex = projectList.value[projectIndex].formList.findIndex(
        form => form.name === name
      );
      return formIndex;
    }

    // 创建表单前
    const beforeCreateForm = () => {
      editingType.value = EditType.FORM;

      formDesc.value = baseFormDesc(
        computedProjectList.value[currentEditProjectIndex.value].formList.map(
          form => form.name
        )
      );
      formData.value = {};
      isShowDialog.value = true;
    };
    // 创建表单
    const createForm = (data: any) => {
      store.commit("createForm", {
        projectIndex: currentEditProjectIndex.value,
        form: data
      });
      Message.success("新增成功");
    };

    // 更新表单前
    const beforeUpdateForm = (node: any) => {
      editingType.value = EditType.FORM;

      formDesc.value = baseFormDesc(
        computedProjectList.value[currentEditProjectIndex.value].formList.map(
          form => form.name
        ),
        node.data.name
      );
      formData.value =
        computedProjectList.value[currentEditProjectIndex.value].formList[
          currentEditFormIndex.value
        ];
      isShowDialog.value = true;
    };

    // 更新表单
    const updateForm = (data: any) => {
      store.commit("updateForm", {
        projectIndex: currentEditProjectIndex.value,
        formIndex: currentEditFormIndex.value,
        form: data
      });
      Message.success("更新成功");
    };

    // 编辑表单 ( 更新 / 创建 )
    const handleEditForm = (data: any) => {
      isUpdate.value ? updateForm(data) : createForm(data);
      isShowDialog.value = false;
      isUpdate.value = false;
    };

    // 删除表单
    const deleteForm = async () => {
      try {
        await MessageBox.confirm("您确定要删除此表单吗?!", "提示", {
          type: "warning"
        });
        store.commit("deleteFormByIndex", {
          projectIndex: currentEditProjectIndex.value,
          formIndex: currentEditFormIndex.value
        });
      } catch {
        // DO NOTHING
      }
    };

    // 选择表单
    const selectForm = async () => {
      const updateSelect = () => {
        store.commit("updateProjectIndex", currentEditProjectIndex.value);
        store.commit("updateFormIndex", currentEditFormIndex.value);
      };

      if (currentFormIndex.value === null) {
        updateSelect();
      } else {
        try {
          await MessageBox.confirm("您确定要切换表单吗?!", "提示", {
            type: "warning"
          });
          updateSelect();
        } catch {
          // DO NOTHING
        }
      }
    };

    const handleCommand = (command: string, node: any) => {
      if (node.level === TreeLevel.PROJECT) {
        currentEditProjectIndex.value = getProjectIndexByName(node.key);

        switch (command) {
          case "delete":
            deleteProject(node);
            break;
          case "update":
            isUpdate.value = true;
            beforeUpdateProject(node);
            break;
          case "create":
            beforeCreateForm();
            break;
        }
      } else if (node.level === TreeLevel.FORM) {
        currentEditProjectIndex.value = getProjectIndexByName(
          node.parent.data.name
        );
        currentEditFormIndex.value = getFormIndexByName(
          currentEditProjectIndex.value,
          node.data.name
        );

        switch (command) {
          case "delete":
            deleteForm();
            break;
          case "update":
            isUpdate.value = true;
            beforeUpdateForm(node);
            break;
          case "select":
            // 当前即选中的, 则无需选择
            if (
              currentEditProjectIndex.value === currentProjectIndex.value &&
              currentEditFormIndex.value === currentFormIndex.value
            ) {
              return;
            }
            selectForm();
            break;
        }
      }
    };

    const handleEdit = (data: any) => {
      if (editingType.value === EditType.PROJECT) {
        handleEditProject(data);
      } else {
        handleEditForm(data);
      }
    };

    // 搜索相关
    function search() {
      const keyword = ref("");
      const tree = ref(null);
      const filterNode = (keyword: string, data: { name: string }) => {
        if (!keyword) return true;
        return data.name.indexOf(keyword) !== -1;
      };

      watch(
        keyword,
        val => {
          (tree.value as any).filter(val);
        },
        { lazy: true }
      );

      return {
        tree,
        filterNode,
        keyword
      };
    }

    const currentNodeKey = computed(() => {
      if (
        currentFormIndex.value !== null &&
        currentProjectIndex.value !== null
      ) {
        return computedProjectList.value[currentProjectIndex.value].formList[
          currentFormIndex.value
        ].key;
      } else {
        return null;
      }
    });
    return {
      ...search(),
      currentNodeKey,
      beforeCreateProject,
      projectList: computedProjectList,
      handleCommand,
      isShowDialog,
      formData,
      formDesc,
      isUpdate,
      handleEdit,
      dialogTitle: computed(
        () =>
          `${isUpdate.value ? "更新" : "新建"}${
            editingType.value === EditType.PROJECT ? "工程" : "表单"
          }`
      ),
      TreeLevel
    };
  }
});
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
