import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const organizationRouter: RouteConfig = {
  path: '/organization',
  component: Layout,
  meta: {
    title: 'organization',
    icon: 'table'
  },
  children: [
    {
      path: 'organization',
      component: () => import(/* webpackChunkName: "organization-index" */ '/src/views/organization/index.vue'),
      name: 'Organization',
      meta: {
        title: 'organization',
        icon: 'table'
      }
    },
    {
      path: 'organization/create',
      component: () => import(/* webpackChunkName: "organization-create" */ '/src/views/organization/create.vue'),
      name: 'CreateOrganization',
      meta: {
        title: 'createOrganization',
        icon: 'component',
        hidden: true
      }
    },
    {
      path: 'organization/edit/:id(\\d+)',
      component: () => import(/* webpackChunkName: "organization-edit" */ '/src/views/organization/edit.vue'),
      name: 'EditOrganization',
      meta: {
        title: 'editOrganization',
        icon: 'component',
        hidden: true
      }
    },
    {
      path: 'manager',
      component: () => import(/* webpackChunkName: "manager" */ '/src/views/organization/manager/index.vue'),
      name: 'Manager',
      meta: {
        title: 'manager',
        icon: 'people'
      }
    },
    {
      path: 'operator',
      component: () => import(/* webpackChunkName: "operator" */ '/src/views/organization/operator/index.vue'),
      name: 'Operator',
      meta: {
        title: 'operator',
        icon: 'user'
      }
    },
    {
      path: 'supervisor',
      component: () => import(/* webpackChunkName: "supervisor" */ '/src/views/organization/supervisor/index.vue'),
      name: 'Supervisor',
      meta: {
        title: 'supervisor',
        icon: 'people'
      }
    }

  ]
}

export default organizationRouter
