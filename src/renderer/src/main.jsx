import React from 'react'
import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import '@/styles/main.less'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
    <App />
  </ConfigProvider>
)