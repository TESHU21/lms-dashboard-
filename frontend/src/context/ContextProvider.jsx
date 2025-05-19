import React from 'react'
import { CourseProvider } from './CourseContext'
import { AuthProvider } from './authContext'

const ContextProvider = ({children}) => {
  return (
<CourseProvider>
    <AuthProvider>
        {children}
    </AuthProvider>
</CourseProvider>
  )
}

export default ContextProvider