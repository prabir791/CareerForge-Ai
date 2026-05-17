import { useState, useEffect } from "react"
import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import Preloader from "./components/Preloader"

function App() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fading out the preloader at 1.4 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1400)

    // Completely remove the preloader from layout at 2.0 seconds
    const removeTimer = setTimeout(() => {
      setShowPreloader(false)
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  return (
    <AuthProvider>
      <InterviewProvider>
        {showPreloader && <Preloader fadeOut={fadeOut} />}
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
