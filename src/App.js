import github from './db';
import { useEffect, useState, useCallback } from 'react';
import query from './Query';
import RepoInfo from './Repoinfo'
import SearchBox from './SearchBox';
import NavButtons from './NavButtons';

function App() {

  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("React");
  let [totalCount, setTotalCount] = useState(null);

  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setendCursor] = useState(null);
  let [hasPreviousPage, sethasPreviousPage] = useState(false);
  let [hasNextPage, sethasNextPage] = useState(true);
  let [paginationKeyword, setpaginationKeyword] = useState("first");
  let [paginationString, setpaginationString] = useState("");

  const fetchData = useCallback(() => {

    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));

    fetch(github.baseUrl, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        data = data.data;
        const viewer = data.viewer;
        const repos = data.search.edges;
        const total = data.search.repositoryCount;
        const start = data.search.pageInfo?.startCursor
        const end = data.search.pageInfo?.endCursor
        const prev = data.search.pageInfo?.hasPreviousPage
        const next = data.search.pageInfo?.hasNextPage

        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);

        setStartCursor(start);
        setendCursor(end);
        sethasNextPage(next);
        sethasPreviousPage(prev);

        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [pageCount, queryString, paginationString, paginationKeyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill">
          Repositories:
        </i>
      </h1>
      <p>hey there {userName}</p>
      <div>
        <SearchBox
          totalCount={totalCount}
          pageCount={pageCount}
          queryString={queryString}
          onTotalChange={(myNumber) => { setPageCount(myNumber) }}
          onQueryChange={(myString) => { setQueryString(myString) }}
        />

      </div>

      {
        repoList && (
          <ul className="list-group-flush">
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.node.id} repo={repo.node} />
              ))
            }
          </ul>
        )
      }

      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(mykeyword, myString) => {
          setpaginationKeyword(mykeyword);
          setpaginationString(myString);
        }}
      />
    </div >
  );
}

export default App;
