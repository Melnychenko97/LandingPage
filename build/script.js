class Slider {
    constructor(paginationParent, pagination, titles, items, buttonsUp, buttonsDown, ...others) {
        this.paginationParent = paginationParent;
        this.pagination = pagination;
        this.titles = titles;
        this.items = items;
        this.buttonsUp = buttonsUp;
        this.buttonsDown = buttonsDown;

    }
    get paginationSwitcher() {
        const pagination = this.pagination;
        const titles = this.titles;
        const items = this.items;

        this.paginationParent.addEventListener('click', (event) => {
            pagination.forEach(item => item.classList.remove('slider__button--nav-active'));
            event.target.classList.toggle('slider__button--nav-active');

            const index = +event.target.getAttribute('id');
            titles.forEach(item => item.classList.remove('slider__list-item-title--active'));
            titles.forEach(item => item.nextElementSibling.classList.remove('slider__pointer--yellow-active') );

            titles[index].classList.toggle('slider__list-item-title--active');
            titles[index].nextElementSibling.classList.toggle('slider__pointer--yellow-active');
        });
        this.paginationParent.addEventListener('click', (event) => {
            const index = +event.target.getAttribute('id');
            items.forEach(item => item.classList.remove('slider__item-active') );
            items[index].classList.toggle('slider__item-active');
        })
    }
    get arrowSwitcher() {
        const items = this.items;
        const pagination = this.pagination;
        const titles = this.titles;
        const ITEM_LAST = 4;
        const ITEM_FIRST = 0;
        const toggling = (index) => {
            items[index].classList.toggle('slider__item-active');
            pagination[index].classList.toggle('slider__button--nav-active');
            titles[index].classList.toggle('slider__list-item-title--active');
            titles[index].nextElementSibling.classList.toggle('slider__pointer--yellow-active');
        };
        const switching = (id, first, last, further) => {
            toggling(id);
            (id === first) ? toggling(last) : toggling(further);
        };

        this.buttonsUp.forEach( item => {
            item.addEventListener('click', (event) => {
               const currentTarget = event.target.closest('.slider__item');
               const id = +currentTarget.getAttribute('id');
               const furtherElemId = id - 1;

               switching(id, ITEM_FIRST, ITEM_LAST, furtherElemId);
            });
        });

        this.buttonsDown.forEach( item => {
            item.addEventListener('click', (event) => {
                const currentTarget = event.target.closest('.slider__item');
                const id = +currentTarget.getAttribute('id');
                const furtherElemId = id + 1;

                switching(id, ITEM_LAST, ITEM_FIRST, furtherElemId);
            });
        });
    }
}

const paginationButtons = document.querySelectorAll('.slider__button--nav');
const paginationList = document.querySelector('.slider__list--buttons');
const titleList = document.querySelectorAll('.slider__list-item-title');
const itemsList = document.querySelectorAll('.slider__item');
const ups = document.querySelectorAll('.item__nav--up');
const downs = document.querySelectorAll('.item__down');

const slider = new Slider(paginationList, paginationButtons, titleList, itemsList, ups, downs);
slider.paginationSwitcher;
slider.arrowSwitcher;

class Animation {
    constructor(element, className) {
        this.element = element;
        this.className = className;
    }
    get hovering () {
        const className = this.className;
        this.element.forEach( item => {
           item.parentElement.addEventListener('mouseover', () => {
               item.classList.toggle(className);
               item.nextElementSibling.classList.toggle(className);
           });
            item.parentElement.addEventListener('mouseout', () => {
                item.classList.toggle(className);
                item.nextElementSibling.classList.toggle(className);
            })
        });
    }
    get scrolling () {
        this.element.addEventListener('click', () => {
            const header = document.querySelector('body');
            header.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
}

const arrows = document.querySelectorAll('.nav__arrow');

const arrowsClick = new Animation(arrows, 'nav__arrow--active');
arrowsClick.hovering;

const sidebarItems = document.querySelectorAll('.nav__img--active');

const sidebarItemsClick = new Animation(sidebarItems, 'nav__img--active');
sidebarItemsClick.hovering;

const goUpButton = document.querySelector('.nav__button--go-up');
const goUpButtonClick = new Animation(goUpButton);
goUpButtonClick.scrolling;