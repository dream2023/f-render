<template>
  <div class="app-main-left-projects">
    <div class="search-comps">
      <el-input placeholder="输入关键字进行过滤" v-model="keyword"> </el-input>
    </div>
    <el-button
      @click="isShowProjectDialog = true"
      class="create-project-btn"
      type="primary"
      size="mini"
      >新建工程</el-button
    >
    <el-tree
      :data="projectList"
      default-expand-all
      ref="tree"
      :filter-node-method="filterNode"
      :props="{ children: 'formList', label: 'name' }"
    >
      <span class="custom-tree-node" slot-scope="{ node }">
        <span>{{ node.label }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="node.level === 1"
              >新建表单</el-dropdown-item
            >
            <el-dropdown-item>编辑名称</el-dropdown-item>
            <el-dropdown-item style="color: #F56C6C"
              >删除{{ node.level === 1 ? "工程" : "表单" }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>

    <ele-form-dialog
      :title="(isUpdate ? '更新' : '新建') + '工程'"
      v-model="projectData"
      :formDesc="formDesc"
      :dialogAttrs="{
        'append-to-body': true
      }"
      @request="handleEditProject"
      :visible.sync="isShowProjectDialog"
    />
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { ref, toRefs, createComponent, watch } from "@vue/composition-api";
import { Message } from "element-ui";

export default createComponent({
  name: "AppMainLeftProjects",
  setup() {
    const { projectList } = toRefs(store.state);
    // 用于判断是新增还是更新
    const isUpdate = ref(false);

    // 工程数据
    const projectData = ref({});
    const isShowProjectDialog = ref(false);

    // 表单数据
    const formData = ref({});
    const isShowFormDialog = ref(false);

    // 搜索相关内
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

    // 创建工程
    const handleEditProject = (data: any) => {
      store.commit("createProject", data);
      isShowProjectDialog.value = false;
      Message.success(isUpdate ? "更新" : "新增" + "成功");
    };

    // 删除工程
    const deleteProject = (data: any) => {
      // TODO
    };

    return {
      ...search(),
      projectList,
      isShowProjectDialog,
      isShowFormDialog,
      formData,
      isUpdate,
      projectData,
      deleteProject,
      handleEditProject,
      formDesc: {
        name: {
          type: "input",
          label: "名称",
          required: true
        }
      }
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
