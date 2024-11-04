import { LitElement, html, css } from 'lit';
import "./hax-card.js";

export class HaxSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
      siteMetadata: { type: Object },
    };
  }

  static get styles() {
    return css`
      /* styles as defined previously */
    `;
  }

  constructor() {
    super();
    this.value = '';
    this.title = '';
    this.loading = false;
    this.items = [];
    this.siteMetadata = null;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <details open>
        <summary>Search the HaxWeb!</summary>
        <div class="search-container">
          <div class="search-icon">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20px" width="20px">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </div>
          <!-- Removed .value binding on the input -->
          <input 
            id="input" 
            class="search-input" 
            placeholder="Enter site URL" 
            @input="${this.updateInput}" 
          />
          <button @click="${this.updateResults}">Analyze</button>
        </div>
      </details>

     
    `;
  }

  // Method to update `value` property on each input event
  updateInput(e) {
    this.value = e.target.value;  // Capture the current input value
  }

  // Analyze function to fetch the data from the input URL
  async updateResults() {
    if (!this.value) {
      alert("Please enter a URL.");
      return;
    }

    this.loading = true;
    const url = this.value.endsWith('/site.json') ? this.value : `${this.value}/site.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Invalid site.json URL");
      
      const data = await response.json();
      if (data && data.items && data.metadata) {
        this.items = data.items;
        this.title = data.title || "No title found";
        
        // Update metadata for overview
        this.siteMetadata = {
          name: data.metadata.site.name,
          description: data.description,
          logo: `${this.value}/${data.metadata.site.logo}`,
          theme: data.metadata.theme.name,
          themeColor: data.metadata.theme.variables.hexCode,
          created: new Date(data.metadata.site.created * 1000).toLocaleDateString(),
          updated: new Date(data.metadata.site.updated * 1000).toLocaleDateString()
        };
      } else {
        this.items = [];
        this.siteMetadata = null;
        console.error("JSON schema mismatch");
      }
    } catch (error) {
      console.error("Failed to fetch or process JSON:", error);
      this.items = [];
      this.siteMetadata = null;
    } finally {
      this.loading = false;
    }
  }

  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);
