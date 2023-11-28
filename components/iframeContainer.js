class IframeContainer extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
        this.shadowRoot.appendChild(linkElement);

        // Set up the HTML template for the component
        this.shadowRoot.innerHTML = `
        <style>
          /* Add your component styles here */
          iframe {
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;
          }
        </style>
        <div id="container mt-3">
          <iframe></iframe>
        </div>
      `;

        // Bind methods to the instance
        this.postMessageToIframe = this.postMessageToIframe.bind(this);
    }

    connectedCallback() {
        // Access the iframe element in the shadow DOM
        this.iframe = this.shadowRoot.querySelector('iframe');
        console.log("in side connected callback");

        // Set up event listener for messages
        this.iframe.contentWindow.addEventListener('message', this.handleMessage.bind(this));
    }

    // disconnectedCallback() {
    //   // Clean up event listener when the component is removed
    //   window.removeEventListener('message', this.handleMessage.bind(this));
    // }

    handleMessage(event) {
        console.log("in side handleMessage");
        // Check if the origin is trusted (you should replace 'http://example.com' with your actual domain)
        //   if (event.origin !== 'http://example.com') {
        //     return;
        //   }

        // Handle the received message
        const { type, data } = event.data;
        console.log(event.data.value);
        // Perform actions based on the message type
        if (type === 'updateIframeContent') {
            this.updateIframeContent(data);
        }
    }

    updateIframeContent(content) {
        // Update the content of the iframe
        console.log("in side updateIframeContent");
        this.iframe.srcdoc = content;
    }

    postMessageToIframe(message) {
        // Send a message to the iframe
        console.log("inside postmessage");
        this.iframe.contentWindow.postMessage(message, '*');
    }
}

// Define the custom element
customElements.define('iframe-container', IframeContainer);
