// =========================
// MOBILE MENU
// =========================

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-links");

function setMenu(open) {
    navMenu.classList.toggle("show-menu", open);
    menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("show-menu"));
});

// Close the menu after tapping a link
navMenu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
        setMenu(false);
    }
});


// =========================
// SCROLL REVEAL
// =========================

const revealSections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);   // reveal once, then stop watching
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealSections.forEach(function (section) {
        revealObserver.observe(section);
    });

} else {
    // Very old browsers: just show everything
    revealSections.forEach(function (section) {
        section.classList.add("show");
    });
}


// =========================
// ACTIVE NAVIGATION
// (IntersectionObserver instead of a scroll listener,
//  so there is no layout work on every scroll event)
// =========================

const navAnchors = document.querySelectorAll(".nav-links a");
const trackedSections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window) {

    const navObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navAnchors.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        },
        {
            // A thin band around the middle of the screen decides the active section
            rootMargin: "-40% 0px -55% 0px"
        }
    );

    trackedSections.forEach(function (section) {
        navObserver.observe(section);
    });
}
