import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
import Pages from "../Pages/Pages";

const getKeywords = (itemData) =>{
  let uniqueKeywords = [];  
  if(itemData.length === 0){
        return [];
    }
    itemData.forEach(items => {
        const { data } = items;
        const { keywords } = data[0];
        uniqueKeywords.push(...keywords);
    });
    let ukw = new Set(uniqueKeywords);
    return [...ukw];
}

const Main = (props) => {


    // const getKeyWord = (itemData) =>{
    //     if(itemData.length === 0){
    //         return [];
    //     }
    //     let uniqueKeyWord = [];
    //     itemData.forEach((item) => {
    //         const { data } = item;
    //         const { keyWords } = data[0];
    //         uniqueKeyWord.push(...keyWords);
    //     });
    //     return [...new Set(uniqueKeyWord)];
    // }

  const { test_data, error } = props;
  const [pageData, setPageData] = useState('');
  const [isPageComponentShown, setIsPageComponentShown] = useState(false);
  const API_KEY = "dkuV7AkRT42KMbck6XpYgzEymzS1p0hbV4QpbW7r";
  const [pictureDesc, setPictureDesc] = useState(test_data ? test_data : '');
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const keywords = getKeywords(pageData);
  console.log(keywords);


  useEffect(async () => {
    setIsLoading(true);

    try {
      const response = await axios({
        url: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true`,
      });
      const { data } = response;
      console.log(data);
      setPictureDesc(data);
      setIsLoading(false);
    } catch (err) {
      console.log("Some Error occurred" + err);
      setIsLoading(false);
      
    }
  }, []);

  const onSearchHandler = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const onSearchButtonHandler = async () => {
      setIsLoading(true);
    const response = await axios({
      url: `https://images-api.nasa.gov/search?q=${searchText}`
    });
    console.log(response);
    const { data } = response;
    const { collection } = data;
    const { items } = collection;
    setPageData(items);
    setIsLoading(false);
    setIsPageComponentShown(true);
    
  };
  return (
    <>
      <main>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            {isPageComponentShown ? (
              <>
                <Pages search_data={pageData} query={searchText} keywords={keywords} />
              </>
            ) : (
              <>
                <div className="top_container">
                  <h2>{pictureDesc && pictureDesc.title}</h2>
                  <div>
                    <input
                      type="text"
                      id="search"
                      value={searchText}
                      onChange={onSearchHandler}
                    ></input>
                    <button
                      type="button"
                      className="search_button"
                      onClick={onSearchButtonHandler}
                    >
                      search
                    </button>
                  </div>
                </div>
                <div className="down_container">
                  <div className="image_container">
                    <img
                      src={pictureDesc.hdurl}
                      data-testid="image-src"
                    ></img>
                  </div>
                  <div>
                    <p className="dec_container" data-testid="image-dec">
                      {pictureDesc.explanation}
                    </p>
                  </div>
                  <div>
                    <p data-testid="image-date" className="dec_container">
                      {pictureDesc.date}
                    </p>
                  </div>
                  <div>
                    <p data-testid="copyright-text" className="dec_container">
                      {pictureDesc.copyright}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};
export default Main;
