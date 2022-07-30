// Vaiables
const tweetlist = document.getElementById('tweet-list');

const entry_time = new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});


const localStorageContent = localStorage.getItem('mytweets');

// Event Listeners
eventListenter();
// Event Listeners
function eventListenter(){
    //Form Submission
    document.querySelector('form').addEventListener('submit', addNewTweet);

    //Remove Tweets from DOM function
     tweetlist.addEventListener('click', removeTweets);

    //Document ready
    document.addEventListener('DOMContentLoaded', localStorageOnload);

}




// Function Definition
function addNewTweet(event){
    event.preventDefault();
    const tweet = document.getElementById('tweet').value.trim();
    console.log(tweet);
    if(tweet === ''){
        alert('Please enter a tweet');
       
    }else{
    //Create an HTML template for the tweet
    html = `
     <!-- //Add a new tweet row  -->
     <div class="col-md-12 d-flex align-items-start mb-4">
         <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
             <img src="./img/profile-photo.png"/>
         </div>
         <div>
           <h6>Ayilara Timmy</h6>
           <p class="tweets"> ${tweet}</p> 
           <div class="divider">
             <span class="label time ml-5">${entry_time}</span>
             <span class="delete-tweet label"><img src="./img/icons/trash.svg"/>Delete Tweets </span>
         </div>
         </div>
     </div>
    
    `;
 
    tweetlist.innerHTML += html;

    //Add tweets to localStorage
    addTweetlocalStorage(tweet); //

    document.location.reload();
    alert('Tweets added successfully');
    }



}



  // Remove tweet Function
  function removeTweets(e){
      e.preventDefault();
    //Deligation. 
    if(e.target.classList.contains('delete-tweet')) {
        e.target.parentElement.parentElement.parentElement.remove(); 

        const getdata = e.target.parentElement.parentElement.parentElement.textContent.trim().replace("Ayilara Timmy","").trim().replace("Delete Tweets", "").replace("\n", "").replace("\n", "").replace("\n", "").replace("\n", "").trim().replace(`${entry_time}`, "").trim().trim();
         //Remove Tweets from localStorage;
         removeTweetFromStorage(getdata);

         setInterval(function(){
            document.location.reload();
        },1000);
    }

  }

  // Add the tweet to the localStorage function
 function addTweetlocalStorage(tweet){

    let tweets = getTweetFromStorage();

        //Add tweets to array of Tweets
        tweets.push(tweet);

        localStorage.setItem('tweets', JSON.stringify(tweets));


  }


  //Get tweet from localStorage
function getTweetFromStorage(tweet) {
    let tweets;

    const tweetLs = localStorage.getItem('tweets');

    if (tweetLs === null){
        tweets = [];
    } 
    else {
        tweets = JSON.parse(tweetLs);
    }
    return tweets;
}

function localStorageOnload(){
    //Gets tweets
    let tweets = getTweetFromStorage();
    //loop through the storage and print the values
    const tweet_number = document.getElementById('tweet-number').textContent=tweets.length;

    tweets.forEach(function(tweet){

        html = `
        <!-- //Add a new tweet row  -->
        <div class="col-md-12 d-flex align-items-start mb-4">
            <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                <img src="./img/profile-photo.png"/>
            </div>
            <div>
              <h6>Ayilara Timmy</h6>
              <p class="tweets"> ${tweet}</p> 
              <div class="divider">
                <span class="label time ml-5">${entry_time}</span>
                <span class="delete-tweet label"><img src="./img/icons/trash.svg"/>Delete Tweets </span>
            </div>
            </div>
        </div>
       
       `;
    
       tweetlist.innerHTML += html;

    });
}


//Remvoe Tweets from localStorage
function removeTweetFromStorage(tweet){
    //Get tweet from local storage
    let tweets = getTweetFromStorage();
    
    
    //loop through the tweets and remove the tweet that is equal 
    tweets.forEach(function(tweetLs, index){
        // console.log(tweetLs);
        if(tweet === tweetLs.trim()){
            tweets.splice(index, 1);
        }
    });
    // console.log(`This is tweetDelete: ${tweet}`);
    // console.log(tweetLs);
    // console.log(tweet);
    //Saving the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
   
}