const header_elements = document.createElement('template');
header_elements.innerHTML = `
    <!-- Banner -->
    <div class="banner">
        <img class="banner_img" src="/Images/City Background.jpg">
        <a href="home.html">
            <img class="banner_logo" src="/Images/GBA logo.jpg">
        </a>
    </div>
    <!-- End Banner -->

    <!-- Navigation Bar-->
    <nav class="navbar">
        <img src="/Decorations/GBA_Navbar_Background.jpg" class="background">
        <ul class="navbar_menu">
            <li class="navbar_item">
                <a href="/home/home.html" class="navbar_links" id="home-page">Home</a>
            </li>
            <li class="navbar_item">
                <a href="/projects/projects.html" class="navbar_links" id="projects-page">Projects</a>
            </li>
            <li class="navbar_item">
                <a href="/clients/clients.html" class="navbar_links" id="contact-page">Clients</a>
            </li>
            <li class="navbar_item">
                <a href="/recruitment/recruitment.html" class="navbar_links" id="recruitment-page">Recruitment</a>
            </li>
            <li class="navbar_item">
                <a href="/contact/contact.html" class="navbar_links" id="contact-page">Contacts</a>
            </li>
        </ul>
    </nav>
    <!-- End Navigation Bar-->

    <!-- Style -->
    <style>
        /* Banner portion */

        .banner {
            position: relative;
        }

        .banner_img {
            position: relative;
            height: 180px;
            width: 100%;
            object-fit: fill;
            z-index: 0;
        }

        .banner_logo {
            position: absolute;
            max-width: 100%;
            height: auto;
            left: 50px;
            top: 20px;
            z-index: 10;
        }

        /* Navigation bar */

        .navbar {
            width: 100%;
            height: 70px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: sticky;
            position: -webkit-sticky;
            top: 0;
            z-index: 999;
            overflow: hidden;
        }

        .navbar .background {
            z-index: -1;
            object-fit: cover;
            position: absolute;
        }

        .navbar_menu {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        li.navbar_item {
            float: left;
            background-color: transparent;
            display: table;
        }

        .navbar_links {
            display: table-cell;
            padding: 30px;
            color: #fff;
            text-decoration: none;
            box-shadow: inset 0 0 0 0 #000;
            transition: ease-out .3s;
        }

        .navbar_links:hover {
            box-shadow: inset 0 100px 0 0 #cc1a1c;
            color: #fff;
        }
    </style>
`;

class GBAHeader extends HTMLElement {  
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode : "closed"});
        shadowRoot.appendChild(header_elements.content);
    }
}

function define_element() {
    customElements.define("gba-header", GBAHeader);
}

define_element();