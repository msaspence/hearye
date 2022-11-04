export default function Home() {
  return (
    <div className="page-outer">
      <div className="header">
        <div className="logo">
          <h1>Hear Ye!</h1>
          <img id="logo" src="src/images/logo.png" alt="Hear Ye!" />
        </div>
        <div className="value-prop">
          <h2>Don't Miss Another Critical Message Again</h2>
          <a
            href="https://api.hearyebot.com/slack/install"
            className="add-to-slack-button"
          >
            <img src="/src/images/slack-logo.svg" />
            Add to Slack
          </a>
        </div>
      </div>

      <div id="features">
        <div className="feature">
          <div className="text">
            <h3>Mark Critical Messages</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie,
              diam vel posuere luctus, orci ligula sagittis diam, eget vehicula
              lacus sapien in lorem. Praesent feugiat eleifend ex vitae mattis.
              Phasellus ornare commodo ante et feugiat. Nunc imperdiet iaculis
              est, at maximus lacus varius eget. Maecenas lobortis magna quis
              diam tempus dapibus. Nullam porta leo lorem, sit amet tempor
              tortor luctus a. Cras nisl libero, gravida at sem sit amet,
              efficitur suscipit sapien. Morbi ac mollis urna. Suspendisse
              laoreet dictum commodo.
            </p>
          </div>
          <div className="slack-screen">
            <div className="nav">
              <div className="skeleton white" />
              <div className="separator" />
              <div className="skeleton grey" />
              <div className="skeleton grey" />
              <div className="skeleton grey" />
              <div className="skeleton grey" />
              <div className="skeleton grey" />
            </div>
          </div>
        </div>

        <div className="feature">
          <h3>Recieve Reminders</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
            vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
            sapien in lorem. Praesent feugiat eleifend ex vitae mattis.
            Phasellus ornare commodo ante et feugiat. Nunc imperdiet iaculis
            est, at maximus lacus varius eget. Maecenas lobortis magna quis diam
            tempus dapibus. Nullam porta leo lorem, sit amet tempor tortor
            luctus a. Cras nisl libero, gravida at sem sit amet, efficitur
            suscipit sapien. Morbi ac mollis urna. Suspendisse laoreet dictum
            commodo.
          </p>
        </div>

        <div className="feature">
          <h3>React to Acknowledge</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
            vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
            sapien in lorem. Praesent feugiat eleifend ex vitae mattis.
            Phasellus ornare commodo ante et feugiat. Nunc imperdiet iaculis
            est, at maximus lacus varius eget. Maecenas lobortis magna quis diam
            tempus dapibus. Nullam porta leo lorem, sit amet tempor tortor
            luctus a. Cras nisl libero, gravida at sem sit amet, efficitur
            suscipit sapien. Morbi ac mollis urna. Suspendisse laoreet dictum
            commodo.
          </p>
        </div>
      </div>

      <div id="pricing">
        <div className="price">$1</div>
        <div className="pers">
          <div className="per">per person</div>
          <div className="per">per month</div>
        </div>
      </div>

      <div id="try">
        <h4>Try For Free</h4>
        <a
          href="https://api.hearyebot.com/slack/install"
          className="add-to-slack-button large"
        >
          <img src="/src/images/slack-logo.svg" />
          Add to Slack
        </a>
      </div>

      <div className="footer">
        <div className="copywrite">© Hear Ye! 2022</div>
        <div className="spacer"></div>
        <div className="menu">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="mailto:hello@hearyebot.com">Contact Us</a>
        </div>
      </div>
    </div>
  )
}
