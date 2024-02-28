// ObjectViewer.jsx

// eslint-disable-next-line react/prop-types
const ObjectViewer = ({ obj }) => {
  // const obj = props.obj ? props.obj : {};
  const jsonString = JSON.stringify(obj, null, 2);
  /* POINT style属性に適応させるスタイルをオブジェクトで記述します */
  const style = {
    display: 'block', // ブロック表示
    margin: 'auto', // 配置を左右中央にする
    border: '1px solid black', // 枠線付けない
    textAlign: 'left',
    minWidth: '480px',
    width: '80%',
    height: '100%',
    fontWeight: 'bold',
  };

  return (
    <div>
      <pre style={style} aria-label="Json-Viewer">
        {jsonString}
      </pre>
    </div>
  );
};

export default ObjectViewer;
