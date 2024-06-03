import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/students',
      name: 'students',
      
      component: () => import('../views/StudentsView.vue'),

      children: [
        {
          path: "add-student",
          name: 'add.student',
          
          component: () => import('../views/Add-StudentView.vue')
        }
      ]
    },
    {
      path: '/class',
      name: 'class',
      
      component: () => import('../views/ClassView.vue'),
      children: [
        {
          path: "add-class",
          name: 'add.class',
          
          component: () => import('../views/Add-ClassView.vue')
        }
      ]
    },
    
  ]
})

export default router
