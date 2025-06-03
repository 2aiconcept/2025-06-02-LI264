import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">404</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            It seems that you try to access to a not known page!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/"
              className="btn btn-primary"
            >
              Return to home page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
