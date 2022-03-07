import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const chargeStationRouter: RouteConfig =
{
  path: '/chargepoint',
  // redirect: '/chargepoint/chargestation',
  component: Layout,
  meta: {
    title: 'chargePoints',
    icon: 'table'
  },
  children: [
    {
      path: 'chargestation',
      component: () => import(/* webpackChunkName: "chargestation-index" */ '/src/views/chargepoint/chargestation/index.vue'),
      name: 'ChargeStation',
      meta: {
        title: 'chargestation',
        icon: 'nested'
      }
    },
    {
      path: 'chargestation/create',
      component: () => import(/* webpackChunkName: "chargestation-create" */ '/src/views/chargepoint/chargestation/create.vue'),
      name: 'CreateChargeStation',
      meta: {
        title: 'createChargeStation',
        icon: 'component',
        hidden: true
      }
    },
    {
      path: 'chargestation/edit/:id(\\d+)',
      component: () => import(/* webpackChunkName: "chargestation-edit" */ '/src/views/chargepoint/chargestation/edit.vue'),
      name: 'EditChargeStation',
      meta: {
        title: 'editChargeStation',
        icon: 'component',
        hidden: true
      }
    },
    {
      path: 'maps',
      component: () => import(/* webpackChunkName: "maps-view" */ '/src/views/maps/view.vue'),
      name: 'Maps',
      meta: {
        title: 'maps',
        icon: 'nested'
      }
    }
    // ,
    // {
    //   path: 'chargestation/company',
    //   component: () => import(/* webpackChunkName: "company" */ '/src/views/chargepoint/company/index.vue'),
    //   name: 'Company',
    //   meta: {
    //     title: 'company',
    //     icon: 'component'
    //   }
    // }
    // ,
    // {
    //   path: 'operator',
    //   component: () => import(/* webpackChunkName: "operator" */ '/src/views/chargepoint/operator/index.vue'),
    //   name: 'Operator',
    //   meta: {
    //     title: 'operator',
    //     icon: 'user'
    //   }
    // },
    // {
    //   path: 'supervisor',
    //   component: () => import(/* webpackChunkName: "supervisor" */ '/src/views/chargepoint/supervisor/index.vue'),
    //   name: 'Supervisor',
    //   meta: {
    //     title: 'supervisor',
    //     icon: 'people'
    //   }
    // },
    // {
    //   path: 'manager',
    //   component: () => import(/* webpackChunkName: "manager" */ '/src/views/chargepoint/manager/index.vue'),
    //   name: 'Manager',
    //   meta: {
    //     title: 'manager',
    //     icon: 'people'
    //   }
    // }//,
    // {
    //   path: 'parkingsensor',
    //   component: () => import(/* webpackChunkName: "parkingsensor" */ '/src/views/chargepoint/parkingsensor/index.vue'),
    //   name: 'ParkingSensor',
    //   meta: {
    //     title: 'parkingsensor',
    //     icon: 'tree'
    //   }
    // },
    // {
    //   path: 'parkingsensor/create',
    //   component: () => import(/* webpackChunkName: "parkingsensor-create" */ '/src/views/chargepoint/parkingsensor/create.vue'),
    //   name: 'CreateParkingSensor',
    //   meta: {
    //     title: 'createParkingSensor',
    //     icon: 'component',
    //     hidden: true
    //   }
    // }

  ]
}

export default chargeStationRouter
