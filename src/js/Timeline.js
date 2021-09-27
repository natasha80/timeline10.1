/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import Modal from './Madal';

function getDate() {
  let date = new Date();
  date = date.toLocaleString('ru');
  date = date.substr(0, 17).replace(',', '');
  return date;
}

export default class Timeline {
  constructor(elem) {
    if (typeof elem === 'string') {
      // eslint-disable-next-line no-param-reassign
      elem = document.querySelector(elem);
    }
    this.element = elem;
    this.modal = new Modal();
    this.createTextPost = this.createTextPost.bind(this);
    this.onCreatePost = this.onCreatePost.bind(this);

    this.feed = this.element.querySelector('.timeline__feed');
    this.audioBtn = this.element.querySelector('.timeline__create-post-audio');
    this.videoBtn = this.element.querySelector('.timeline__create-post-video');
    this.textArea = this.element.querySelector('.timeline__create-post-text');

    this.modal.showModal = this.modal.showModal.bind(this.modal);
    this.modal.createModal = this.modal.createModal.bind(this.modal);
    this.modal.onSaveCoord = this.modal.onSaveCoord.bind(this);
    this.modal.onCancel = this.modal.onCancel.bind(this);
    this.modal.checkFormat = this.modal.checkFormat.bind(this);
  }

  init() {
    this.geo();
    this.textArea.addEventListener('keydown', this.onCreatePost);
  }

  geo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.log(`определить позицию не удалось. Ошибка: ${error}`);
        },
      );
    }
  }

  onCreatePost(event) {
    this.text = this.textArea.value.trim();
    if (event.key === 'Enter' && this.text) {
      event.preventDefault();
      this.textArea.value = '';
      if (!this.latitude) {
        this.modal.showModal();
        return;
      }
      this.createTextPost();
    }
  }

  createTextPost() {
    this.geo();
    const post = this.markupОfThePost(this.text);
    this.feed.insertBefore(post, this.feed.firstElementChild);
  }

  markupОfThePost(content) {
    const date = getDate();
    const markup = document.createElement('div');
    markup.classList.add('timeline__feed-post');
    markup.innerHTML = `
    <div class="post-date">${date}</div>
    <div class="post-text">${content}</div>
    <div class="post-geolacation">[${this.latitude}, ${this.longitude}] 🌍</div>
  `;
    return markup;
  }
}