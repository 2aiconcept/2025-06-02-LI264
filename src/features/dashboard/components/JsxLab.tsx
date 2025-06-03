const JsxLab = () => {
  // Variables pour les exemples
  const userName = "Jean Dupont";
  const userAge = 25;
  const isLoggedIn = true;
  const isAdmin = false;
  let pageTitle = "Laboratoire JSX";
  const changeTitle = () => {
    pageTitle = "My super Lab JSX";
    console.log(pageTitle);
  };
  const changeTitleWithParam = (title: string) => {
    pageTitle = title;
    console.log(pageTitle);
  };

  if (isLoggedIn) {
    return (
      <>
        <h5>{pageTitle}</h5>
        {isAdmin && <p>utilisateur admin</p>}
        <div>utilisateur connecté</div>
        {!isAdmin && <p>utilisateur n'est pas admin</p>}
        <p>
          utilisateur : {userName} age : {userAge}
        </p>
        {/* ternaire */}
        {userAge < 18 ? (
          <p>utilisateur mineur</p>
        ) : (
          <p>utilisateur est majeur</p>
        )}
        <button
          className="btn btn-primary"
          onClick={changeTitle}
        >
          change title
        </button>
        <button
          className="btn btn-primary"
          onClick={() => changeTitleWithParam("My new Jsx Lab title")}
        >
          change title
        </button>
      </>
    );
  }

  return (
    <>
      <div>utilisateur non connecté</div>
    </>
  );
};
export default JsxLab;
