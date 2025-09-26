// css
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About the S&P 500 Map</h1>

      {/* Table of Contents */}
      <nav className="about-toc">
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#purpose-project">1. Purpose of This Project</a>
          </li>
          <li>
            <a href="#data-collection">2. Data Collection</a>
          </li>
          <li>
            <a href="#data-processing">3. Data Processing</a>
          </li>
          <li>
            <a href="#react-building">4. React Building Time</a>
          </li>
          <li>
            <a href="#analysis">5. Analysis</a>
          </li>
          <li>
            <a href="#conclusion">6. Conclusion</a>
          </li>
        </ul>
      </nav>

      {/* Sections */}
      <section id="purpose-project">
        <h2>1. Purpose of This Project</h2>
        <p>
          One day, I was watching the news and heard the term S&P 500 mentioned multiple times. Usually, I don’t pay much attention, but this time it felt different. I became curious about the constituent companies of the S&P 500, so I started researching online. There are many variables like market caps, highs and lows, etc., but I wanted to focus on something more tangible. That’s when I thought, “What if I map the headquarters of these S&P 500 companies?” And that’s how this project began: mapping the locations of S&P 500 companies. <br />
          <br />
          <em>Note: Companies headquartered outside of the US are not included in this list.</em>
        </p>
      </section>

      <section id="data-collection">
        <h2>2. Data Collection</h2>
        <p>
          To map the locations of S&P 500 companies' headquarters, I first needed to collect data. I searched online but couldn’t find a comprehensive dataset, so I started collecting the data myself. I found the Wikipedia page listing all 503 companies (not 500—who knew?!). The table included the company name, ticker symbol, and location. However, the locations weren’t precise. I needed exact latitude and longitude. Still, it was a good starting point, so I copied the table into a Google Sheet. <br/>
          <br/>
          Next, I wanted to get logos for each company. I discovered I could retrieve favicons from each company’s website. I didn’t want to manually go through all 503 sites, so I relied on the power of AI :) <br/>
          <br/>
          From my one-year physics research, which involved coding and prompt engineering, I knew how to break tasks into manageable chunks. Since I was using ChatGPT’s free plan, I couldn’t request all 503 companies at once. I asked in batches of 100 companies five times, and finally got the domains for all 503 companies. I then checked the results in Google Sheets. Cells can display images, and it worked for about 90% of the companies. Some logos didn’t display because: <br/>
          &nbsp;&nbsp; 1. ChatGPT gave the wrong domain. <br/>
          &nbsp;&nbsp; 2. The website didn’t have a favicon. <br/>
          <br/>
          For the first case, I manually corrected the domains. For the second, companies like Berkshire Hathaway don’t have favicons, so I had to find logos online. This logo collection task took about four hours 😂. <br/>
          <br/>
          Finally, I relied on AI again to list the addresses of headquarters for all 503 companies. As before, I asked in batches of 100. (Some companies have headquarters outside the US, so in those cases, I picked one location within the US.)
        </p>
      </section>

      <section id="data-processing">
        <h2>3. Data Processing</h2>
        <p>
          Now that I had all the addresses of the S&P 500 companies' headquarters, I still couldn’t directly map them. I needed to geocode these addresses into latitude and longitude. <br/><br/>

          After some research, I found a free website that could process a CSV file and convert addresses into latitudes and longitudes. I uploaded my file and got all the coordinates. <br/><br/>

          Finally, I had all the information I needed for the project, so I could move on to coding. Phew 😗💨
        </p>
      </section>

      <section id="react-building">
        <h2>4. React Building Time</h2>
        <p>
          I enjoy building websites with React + Vite, so naturally, I decided to visualize and map the data using the same stack. I named the project <strong>S&P 500 Map</strong> (very creative, huh?). I started with the main page. At that point, I wasn’t sure if I would have more than one page. I chose Leaflet to display the map because it’s free and reliable. Getting the map to show went smoothly. <br/>
          <br/>
          Next, I wanted to plot the companies on the map with markers. I had all the coordinates, but they were in a Google Sheet, so I needed a file that could be processed in my React project. I wrote a Python script to read the CSV, process the data, and generate a JSON file. <br/>
          <br/>
          After generating the JSON file, I used it in the project successfully. However, I noticed that the Leaflet map showed the entire world, while S&P 500 companies are mostly focused in the US. Leaflet doesn’t support restricting the map natively, so I had to find a workaround. <br/>
          <br/>
          I discovered that there’s a GeoJSON polygon for the US. By overlaying this polygon on the map, I could focus on the US. I downloaded the GeoJSON and used it in the project. It displayed correctly. But there was still a problem: even with the US polygon, the rest of the world was visible. I solved this by setting <code>opacity={0}</code> for the <code>TileLayer</code> component, making all other countries transparent. Now the map shows only the US with the 500 companies. <br/>
          <br/>
          I then added a header and footer, and implemented a search bar to filter companies. The search bar was a bit “cranky” at first, so I added debounce to smooth it out. After testing, it worked perfectly. :) <br/>
          <br/>
          I also set up CI/CD for the project: I created a YAML file in <code>/.github/workflows</code> so that whenever I update the project, it automatically deploys the production site on GitHub. This way, any changes I make go live automatically without manual deployment. <br/>
          <br/>
          If you’re curious, here’s my GitHub link: <a href="https://github.com/shin-noda/s-and-p-500-map" target="_blank" rel="noopener noreferrer">https://github.com/shin-noda/s-and-p-500-map</a>
        </p>
      </section>

      <section id="analysis">
        <h2>5. Spatial Analysis: Moran’s I</h2>
        <p>
          After mapping all the headquarters, I became curious about their spatial distribution. Are they clustered in tech hubs and financial centers, uniformly spread, or randomly distributed across the US? To answer this, I calculated <strong>Moran’s I</strong>, a measure of spatial autocorrelation.<br/>
          <br/>
          The result was <strong>0.005</strong>, which is very close to 0. This indicates that, at a national scale, the distribution of S&P 500 headquarters is essentially random. While we clearly see clusters in Silicon Valley or New York, these are balanced out by sparse areas elsewhere, making the overall pattern appear random. <br/>
          <br/>
          <strong>Interpretation:</strong><br/>
          <strong>I = 1:</strong> Perfect clustering<br/>
          <strong>I = 0:</strong> Random distribution<br/>
          <strong>I = -1:</strong> Perfectly uniform (evenly spaced)<br/>
          <br/>
          Our value (<strong>0.005</strong>) is very close to 0 → mostly random at the national scale. This shows that even though there are clear tech and finance clusters, the overall spatial pattern across the US is surprisingly random.
        </p>
      </section>

      <section id="conclusion">
        <h2>6. Conclusion</h2>
        <p>
          Lessons I learned: <br/>
          - Finding the headquarters locations and logos of companies took more time than I expected. There is no standardized dataset for this specific task (at least not for free 😉).<br/>
          - Leaflet doesn’t support some features natively, such as showing only one country, so you need to get creative. For example, using GeoJSON and making the rest of the map transparent. (I’m sure there are other solutions too 😎).<br/>
          - AI made this project a lot easier, such as listing addresses for companies. However, as of September 2025, not all AI-generated results are accurate. Overall, it reduced the time needed to complete the task, but it also created additional work because I had to verify the data. AI is changing the way people approach tasks.<br/>
          - The spatial pattern of the headquarters of the S&P 500 companies is random🤯.<br/>
          <br/>
          Thank you for reading this page! Take care :)
        </p>
      </section>
      
    </div>
  );
};

export default About;