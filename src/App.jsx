import {
  ReactiveBase,
  SearchBox,
  MultiList,
  ReactiveList,
  ResultList,
} from "@appbaseio/reactivesearch";

const { ResultListWrapper } = ReactiveList;

function App() {
  return (
    <ReactiveBase
      url="https://6BFanD42Y:8a04d799-e4b4-4661-b20c-cc0776298caa@movie-data-zyukmjc-arc.searchbase.io"
      app="movies"
    >
      <nav
        style={{
          padding: "10px 20px",
          background: "#f1f1f1",
          height: 70,
          display: "flex",
          alignItems: "center",
          fontSize: 18,
          fontWeight: "bolder",
          justifyContent: "space-between",
        }}
      >
        <div>Movie</div>
        <SearchBox
          componentId="searchbox"
          dataField={["title"]}
          onValueSelected={(value, cause, source) => {
            console.log("selected value", value);
            console.log("selected obj", source);
          }}
          style={{ width: "70%" }}
        />
      </nav>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "#D3D3D3" }}>
          <MultiList
            componentId="langfilter"
            dataField="original_lang.keyword"
          />
        </div>
        <div style={{ width: "70%" }}>
          <ReactiveList
            dataField="title"
            componentId="result"
            react={{ and: ["searchbox", "langfilter"] }}
            pagination={true}
            render={({ loading, error, data }) => {
              if (loading) {
                return <div> fetching results... </div>;
              }
              if (error) {
                return <div> something went wrong. Error </div>;
              }
              return (
                <ResultListWrapper>
                  {data.map((item) => (
                    <ResultList key={item._id}>
                      <ResultList.Image
                        src={
                          "https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
                        }
                      />
                      <ResultList.Content>
                        <ResultList.Title
                          dangerouslySetInnerHTML={{
                            __html: item.title,
                          }}
                        />
                        <ResultList.Description>
                          <div>
                            <div>on {item.rel_date}</div>
                            <div>({item.overview} avg)</div>
                          </div>
                          <span>rating {item.vote_average}</span>
                        </ResultList.Description>
                      </ResultList.Content>
                    </ResultList>
                  ))}
                </ResultListWrapper>
              );
            }}
          />
        </div>
      </div>
    </ReactiveBase>
  );
}

export default App;
