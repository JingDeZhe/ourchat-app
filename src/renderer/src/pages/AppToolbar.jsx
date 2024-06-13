const fakeApi = {
  minimize: () => {},
  maximize: () => {},
  close: () => {}
}

export const AppToolbar = () => {
  const { minimize, maximize, close } = window.api || fakeApi
  return (
    <div className="app-tools">
      <div className="flex-1 drag-place"></div>
      <div className="btns">
        <span onClick={() => minimize()}>
          <i className="i-tabler-minus"></i>
        </span>
        <span onClick={() => maximize()}>
          <i className="i-tabler-maximize"></i>
        </span>
        <span onClick={() => close()}>
          <i className="i-tabler-x"></i>
        </span>
      </div>
    </div>
  )
}
