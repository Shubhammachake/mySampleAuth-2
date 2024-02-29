import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let mydata = localStorage.getItem("myInfo");
  let myData = JSON.parse(mydata);

  const [isLog, setIsLog] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20); // Change this value as per your requirement
  const [isGridView, setIsGridView] = useState(false); // State to track the current view mode

  useEffect(() => {
    if (myData !== null) {
      setIsLog(true);
    }

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {isLog && (
        <>
          <div className="div-buttons">
            {" "}
            <button className="btns" onClick={() => setIsGridView(!isGridView)}>
              Toggle View
            </button>{" "}
            <button className="btns" onClick={handleLogOut}>
              LogOut
            </button>
          </div>
          {/* Toggle button */}
          {isGridView ? ( // Conditionally render based on view mode
            <div className="grid-view">
              {currentPosts.map((item, index) => (
                <div key={index} className="grid-item">
                  <p>{item.id}</p>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="list-view">
              {currentPosts.map((item, index) => (
                <ul key={index}>
                  <li>
                    {item.id}:{item.title}
                  </li>
                </ul>
              ))}
            </div>
          )}
          {/* Pagination */}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(data.length / postsPerPage) },
              (_, index) => (
                <div className="btns" key={index}>
                  <button className="btns" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
