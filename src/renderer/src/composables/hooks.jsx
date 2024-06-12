export const useRefresh = () => {
  const navigate = useNavigate()
  return () => {
    navigate('./', { replace: true })
  }
}
