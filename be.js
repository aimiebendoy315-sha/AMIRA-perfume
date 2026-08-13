/* ==========================================
   SCENT & STORY
   E-COMMERCE JAVASCRIPT
   NO DATABASE
========================================== */


/* ==========================================
   PRODUCT DATA
========================================== */

const products = [
    {
        id: 1,
        name: "AMIRA",
        family: "floral",
        price: 599,
        top: "Bergamot",
        heart: "White Rose",
        base: "Musk",
        description: "A soft, elegant fragrance for slow mornings, quiet confidence, and beautiful memories.",
        mood: "Serene",
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 2,
        name: "Amaya",
        family: "fresh",
        price: 549,
        top: "Calamansi",
        heart: "Green Tea",
        base: "Cedar",
        description: "Bright and refreshing, inspired by the feeling of a fresh beginning.",
        mood: "Energized",
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 3,
        name: "Sol",
        family: "warm",
        price: 649,
        top: "Orange",
        heart: "Vanilla",
        base: "Amber",
        description: "Warm golden notes that feel like sunlight on a late afternoon.",
        mood: "Radiant",
        badge: "SIGNATURE",
        image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 4,
        name: "Mara",
        family: "woody",
        price: 679,
        top: "Black Pepper",
        heart: "Sandalwood",
        base: "Oud",
        description: "Deep, elegant, and confident for people who love a little mystery.",
        mood: "Bold",
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 5,
        name: "Elia",
        family: "floral",
        price: 579,
        top: "Pear",
        heart: "Jasmine",
        base: "Vanilla",
        description: "Sweet and romantic without being too loud.",
        mood: "Romantic",
        badge: "LOVED",
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 6,
        name: "Ari",
        family: "fresh",
        price: 529,
        top: "Lemon",
        heart: "Mint",
        base: "White Musk",
        description: "Clean, cool, and effortlessly refreshing.",
        mood: "Fresh",
        badge: "EVERYDAY",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 7,
        name: "Sienna",
        family: "warm",
        price: 699,
        top: "Cinnamon",
        heart: "Cocoa",
        base: "Tonka",
        description: "A cozy fragrance made for rainy evenings and warm conversations.",
        mood: "Cozy",
        badge: "COZY",
        image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 8,
        name: "Noir",
        family: "woody",
        price: 729,
        top: "Cardamom",
        heart: "Leather",
        base: "Vetiver",
        description: "Dark, sophisticated, and made to leave an impression.",
        mood: "Confident",
        badge: "INTENSE",
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 9,
        name: "Celeste",
        family: "floral",
        price: 619,
        top: "Peony",
        heart: "Jasmine",
        base: "Soft Musk",
        description: "A graceful floral blend with a clean, luminous finish.",
        mood: "Elegant",
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=90"
    },
    {
        id: 10,
        name: "Velour",
        family: "warm",
        price: 749,
        top: "Saffron",
        heart: "Amber",
        base: "Sandalwood",
        description: "A rich, sensual scent with a polished and unforgettable finish.",
        mood: "Magnetic",
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=90"
    }
];


/* ==========================================
   STATE
========================================== */

let cart =
    JSON.parse(
        localStorage.getItem("scentStoryCart")
    ) || [];

let currentFilter = "all";
let selectedProduct = null;
let quizIndex = 0;

let quizScore = {
    floral: 0,
    fresh: 0,
    warm: 0,
    woody: 0
};

const productsContainer =
    document.getElementById("products");

const searchInput =
    document.getElementById("searchInput");

const cartModal =
    document.getElementById("cartModal");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* ==========================================
   MONEY
========================================== */

function money(value) {

    return "₱" +
        Number(value).toLocaleString(
            "en-PH"
        );

}


/* ==========================================
   RENDER PRODUCTS
========================================== */

function renderProducts() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const filtered =
        products.filter(product => {

            const familyMatch =
                currentFilter === "all" ||
                product.family === currentFilter;

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(search) ||
                product.description
                    .toLowerCase()
                    .includes(search) ||
                product.top
                    .toLowerCase()
                    .includes(search) ||
                product.heart
                    .toLowerCase()
                    .includes(search) ||
                product.base
                    .toLowerCase()
                    .includes(search);

            return familyMatch && searchMatch;

        });


    if (!filtered.length) {

        productsContainer.innerHTML = `
            <div class="empty-products">
                <h3>No fragrance found.</h3>
                <p>Try another scent or search term.</p>
            </div>
        `;

        return;

    }


    productsContainer.innerHTML =
        filtered.map(product => `

            <article
                class="product-card"
                data-id="${product.id}"
            >

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name} perfume"
                        loading="lazy"
                    >

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                </div>

                <div class="product-info">

                    <span class="product-family">
                        ${product.family}
                    </span>

                    <div class="product-name-row">

                        <h3 class="product-name">
                            ${product.name}
                        </h3>

                        <strong class="product-price">
                            ${money(product.price)}
                        </strong>

                    </div>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-notes">

                        <span>
                            ${product.top}
                        </span>

                        <span>
                            ${product.heart}
                        </span>

                        <span>
                            ${product.base}
                        </span>

                    </div>

                    <div class="product-actions">

                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Bag
                        </button>

                        <button
                            class="view-btn"
                            onclick="openProduct(${product.id})"
                            title="View product"
                        >
                            <i data-lucide="eye"></i>
                        </button>

                    </div>

                </div>

            </article>

        `).join("");


    lucide.createIcons();

}


/* ==========================================
   FILTERS
========================================== */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                currentFilter =
                    button.dataset.filter;

                renderProducts();

            }
        );

    });


/* ==========================================
   SEARCH
========================================== */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast(
        `${product.name} added to your bag.`
    );

}


/* ==========================================
   SAVE CART
========================================== */

function saveCart() {

    localStorage.setItem(
        "scentStoryCart",
        JSON.stringify(cart)
    );

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    if (!cart.length) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your bag is waiting for a scent.</p>
            </div>
        `;

        cartTotal.textContent =
            money(0);

        return;

    }


    cartItems.innerHTML =
        cart.map(item => `

            <div class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${money(item.price)}
                    </p>

                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    cartTotal.textContent =
        money(total);

}


/* ==========================================
   QUANTITY
========================================== */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    saveCart();

    updateCart();

}


/* ==========================================
   REMOVE CART ITEM
========================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            product =>
                product.id !== id
        );

    saveCart();

    updateCart();

    showToast(
        "Item removed from your bag."
    );

}


/* ==========================================
   OPEN CART
========================================== */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        () => {

            updateCart();

            cartModal.classList.add(
                "active"
            );

        }
    );


/* ==========================================
   CLOSE CART
========================================== */

document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        () => {

            cartModal.classList.remove(
                "active"
            );

        }
    );


/* ==========================================
   PRODUCT MODAL
========================================== */

function openProduct(id) {

    selectedProduct =
        products.find(
            product =>
                product.id === id
        );

    if (!selectedProduct) return;


    document.getElementById(
        "modalProductImage"
    ).src =
        selectedProduct.image;


    document.getElementById(
        "modalProductImage"
    ).alt =
        selectedProduct.name +
        " perfume";


    document.getElementById(
        "modalProductName"
    ).textContent =
        selectedProduct.name;


    document.getElementById(
        "modalProductFamily"
    ).textContent =
        selectedProduct.family;


    document.getElementById(
        "modalProductDescription"
    ).textContent =
        selectedProduct.description;


    document.getElementById(
        "modalProductPrice"
    ).textContent =
        money(
            selectedProduct.price
        );


    document.getElementById(
        "modalTop"
    ).textContent =
        selectedProduct.top;


    document.getElementById(
        "modalHeart"
    ).textContent =
        selectedProduct.heart;


    document.getElementById(
        "modalBase"
    ).textContent =
        selectedProduct.base;


    document
        .getElementById(
            "productModal"
        )
        .classList.add(
            "active"
        );


    lucide.createIcons();

}


document
    .getElementById("closeProduct")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "productModal"
                )
                .classList.remove(
                    "active"
                );

        }
    );


document
    .getElementById("modalAdd")
    .addEventListener(
        "click",
        () => {

            if (!selectedProduct) return;

            addToCart(
                selectedProduct.id
            );

            document
                .getElementById(
                    "productModal"
                )
                .classList.remove(
                    "active"
                );

        }
    );


/* ==========================================
   QUIZ QUESTIONS
========================================== */

const quizQuestions = [

    {
        question:
            "What kind of feeling do you want your perfume to give?",

        options: [

            {
                text:
                    "Soft, romantic, and graceful",
                family:
                    "floral"
            },

            {
                text:
                    "Fresh, clean, and energetic",
                family:
                    "fresh"
            },

            {
                text:
                    "Warm, cozy, and comforting",
                family:
                    "warm"
            },

            {
                text:
                    "Bold, mysterious, and confident",
                family:
                    "woody"
            }

        ]

    },

    {
        question:
            "Which scene feels most like you?",

        options: [

            {
                text:
                    "A garden full of flowers",
                family:
                    "floral"
            },

            {
                text:
                    "A cool morning by the sea",
                family:
                    "fresh"
            },

            {
                text:
                    "A sunset with warm lights",
                family:
                    "warm"
            },

            {
                text:
                    "A sophisticated evening out",
                family:
                    "woody"
            }

        ]

    },

    {
        question:
            "Pick the note family you would love most.",

        options: [

            {
                text:
                    "Rose, jasmine, and peony",
                family:
                    "floral"
            },

            {
                text:
                    "Citrus, mint, and green tea",
                family:
                    "fresh"
            },

            {
                text:
                    "Vanilla, amber, and cocoa",
                family:
                    "warm"
            },

            {
                text:
                    "Oud, leather, and sandalwood",
                family:
                    "woody"
            }

        ]

    }

];


/* ==========================================
   START QUIZ
========================================== */

document
    .getElementById("startQuiz")
    .addEventListener(
        "click",
        () => {

            quizIndex = 0;

            quizScore = {
                floral: 0,
                fresh: 0,
                warm: 0,
                woody: 0
            };

            document
                .getElementById(
                    "quizModal"
                )
                .classList.add(
                    "active"
                );

            renderQuizQuestion();

        }
    );


/* ==========================================
   RENDER QUIZ
========================================== */

function renderQuizQuestion() {

    const question =
        quizQuestions[quizIndex];


    document.getElementById(
        "quizStep"
    ).textContent =
        `${quizIndex + 1} / ${quizQuestions.length}`;


    document.getElementById(
        "quizProgress"
    ).style.width =
        `${((quizIndex + 1) / quizQuestions.length) * 100}%`;


    document.getElementById(
        "quizContent"
    ).innerHTML = `

        <h2 class="quiz-question">
            ${question.question}
        </h2>

        <div class="quiz-options">

            ${question.options.map(
                option => `

                    <button
                        class="quiz-option"
                        data-family="${option.family}"
                    >
                        ${option.text}
                    </button>

                `
            ).join("")}

        </div>

    `;


    document
        .querySelectorAll(".quiz-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    quizScore[
                        button.dataset.family
                    ]++;

                    quizIndex++;


                    if (
                        quizIndex <
                        quizQuestions.length
                    ) {

                        renderQuizQuestion();

                    } else {

                        showQuizResult();

                    }

                }
            );

        });

}


/* ==========================================
   QUIZ RESULT
========================================== */

function showQuizResult() {

    let winner =
        Object.keys(
            quizScore
        ).reduce(
            (a, b) =>
                quizScore[a] >
                quizScore[b]
                    ? a
                    : b
        );


    const matches =
        products.filter(
            product =>
                product.family === winner
        );


    const recommended =
        matches[0];


    document.getElementById(
        "quizStep"
    ).textContent =
        "✓";


    document.getElementById(
        "quizContent"
    ).innerHTML = `

        <div class="quiz-result">

            <div class="result-icon">
                ✦
            </div>

            <span class="section-label">
                YOUR SCENT MATCH
            </span>

            <h2>
                ${recommended.name}
            </h2>

            <p>
                ${recommended.description}
            </p>

            <p>
                <strong>
                    ${recommended.top}
                </strong>
                ·
                <strong>
                    ${recommended.heart}
                </strong>
                ·
                <strong>
                    ${recommended.base}
                </strong>
            </p>

            <button
                class="dark-btn"
                id="quizAdd"
            >
                Add ${recommended.name} to Bag
                <i data-lucide="shopping-bag"></i>
            </button>

        </div>

    `;


    lucide.createIcons();


    document
        .getElementById("quizAdd")
        .addEventListener(
            "click",
            () => {

                addToCart(
                    recommended.id
                );

                document
                    .getElementById(
                        "quizModal"
                    )
                    .classList.remove(
                        "active"
                    );

            }
        );

}


/* ==========================================
   CLOSE QUIZ
========================================== */

document
    .getElementById("closeQuiz")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "quizModal"
                )
                .classList.remove(
                    "active"
                );

        }
    );


/* ==========================================
   CHECKOUT
========================================== */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        openCheckout
    );


function openCheckout() {

    if (!cart.length) {

        showToast(
            "Your bag is empty."
        );

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        money(total);


    document
        .getElementById(
            "checkoutModal"
        )
        .classList.add(
            "active"
        );

}


document
    .getElementById("closeCheckout")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "checkoutModal"
                )
                .classList.remove(
                    "active"
                );

        }
    );


/* ==========================================
   PLACE ORDER
========================================== */

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();


            if (!name) return;


            const order =
                "SS-" +
                Math.floor(
                    100000 +
                    Math.random() *
                    900000
                );


            document.getElementById(
                "successName"
            ).textContent =
                name + ".";


            document.getElementById(
                "orderNumber"
            ).textContent =
                order;


            document
                .getElementById(
                    "checkoutModal"
                )
                .classList.remove(
                    "active"
                );


            cart = [];

            saveCart();

            updateCart();

            cartModal.classList.remove(
                "active"
            );


            document
                .getElementById(
                    "successModal"
                )
                .classList.add(
                    "active"
                );

        }
    );


/* ==========================================
   SUCCESS
========================================== */

document
    .getElementById("doneBtn")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "successModal"
                )
                .classList.remove(
                    "active"
                );


            document
                .getElementById(
                    "collection"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ==========================================
   STORY MODAL
========================================== */

document
    .getElementById("storyBtn")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "storyModal"
                )
                .classList.add(
                    "active"
                );

        }
    );


document
    .getElementById("closeStory")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "storyModal"
                )
                .classList.remove(
                    "active"
                );

        }
    );


/* ==========================================
   NEWSLETTER
========================================== */

document
    .getElementById(
        "newsletterForm"
    )
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "newsletterEmail"
                ).value;


            showToast(
                `Thank you! ${email} subscribed.`
            );


            event.target.reset();

        }
    );


/* ==========================================
   SOCIAL LINKS
========================================== */

document
    .getElementById(
        "instagramBtn"
    )
    .addEventListener(
        "click",
        event => {

            event.preventDefault();

            showToast(
                "Instagram page coming soon."
            );

        }
    );


document
    .getElementById(
        "facebookBtn"
    )
    .addEventListener(
        "click",
        event => {

            event.preventDefault();

            showToast(
                "Facebook page coming soon."
            );

        }
    );


/* ==========================================
   MOBILE MENU
========================================== */

document
    .getElementById("mobileBtn")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "mainNav"
                )
                .classList.toggle(
                    "active"
                );

        }
    );


document
    .querySelectorAll(
        "#mainNav a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "mainNav"
                    )
                    .classList.remove(
                        "active"
                    );

            }
        );

    });


/* ==========================================
   DARK MODE
========================================== */

document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "scentStoryDark",
                dark
            );


            document.getElementById(
                "themeBtn"
            ).innerHTML =
                dark
                    ? `<i data-lucide="sun"></i>`
                    : `<i data-lucide="moon"></i>`;


            lucide.createIcons();

        }
    );


if (
    localStorage.getItem(
        "scentStoryDark"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );


    document.getElementById(
        "themeBtn"
    ).innerHTML =
        `<i data-lucide="sun"></i>`;

}


/* ==========================================
   TOAST
========================================== */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* ==========================================
   INITIALIZE
========================================== */

renderProducts();

updateCart();

lucide.createIcons();