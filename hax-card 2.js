import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxItem extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.location = '';
    this.readtime = '';
    this.tags = [];
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      logo: { type: String },
      location: { type: String },   // New property for content location URL
      readtime: { type: String },   // New property for read time
      tags: { type: Array }         // New property for tags
    };
  }

  static get styles() {
    return css`
      .card {
        display: inline-block;
        width: 240px;
        height: auto;
        border-radius: 8px;
        overflow: hidden;
        transition: box-shadow 0.3s ease;
        cursor: pointer;
        text-align: center;
        padding: 10px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: relative;
      }

      .card:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .image-container {
        position: relative;
        width: 100%;
        height: 140px;
        overflow: hidden;
      }

      img {
        width: 240px;
        height: 140px;
        object-fit: cover;
        border-radius: 4px;
      }

      .info {
        margin-top: 5px;
        font-size: 14px;
        font-weight: bold;
      }

      .secondary {
        font-size: 12px;
        color: #555;
      }

      .metadata {
        font-size: 10px;
        color: #777;
        margin-top: 5px;
      }

      .tag-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        margin-top: 5px;
      }

      .tag {
        background-color: #e0e0e0;
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 10px;
        color: #555;
      }

      .button-container {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
      }

      .open-btn {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .open-btn:hover {
        background-color: #45a049;
      }
    `;
  }

  render() {
    const createdDate = this.created ? new Date(parseInt(this.created) * 1000).toLocaleDateString() : '';
    const updatedDate = this.lastUpdated ? new Date(parseInt(this.lastUpdated) * 1000).toLocaleDateString() : '';

    return html`
      <div class="card">
        <div class="image-container">
          <img src="${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="secondary">${this.description}</div>
        
        <div class="metadata">Created: ${createdDate}</div>
        <div class="metadata">Updated: ${updatedDate}</div>
        <div class="metadata">Read Time: ${this.readtime} min</div>

        <!-- Tags -->
        <div class="tag-list">
          ${this.tags.map(tag => html`<span class="tag">${tag}</span>`)}
        </div>

        <!-- Open Buttons -->
        <div class="button-container">
          <button class="open-btn" @click="${this.openContent}">Open Content</button>
          <button class="open-btn" @click="${this.openSource}">View Source</button>
        </div>
      </div>
    `;
  }

  openContent() {
    window.open(this.location, '_blank');
  }

  openSource() {
    window.open(this.logo, '_blank');
  }

  static get tag() {
    return "hax-item";
  }
}

customElements.define(HaxItem.tag, HaxItem);
