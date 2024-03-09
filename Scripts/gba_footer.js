const footer_elements = document.createElement('template');
footer_elements.innerHTML = `
    <!-- Footer -->
    
    <script src="https://kit.fontawesome.com/8929c72c4d.js" crossorigin="anonymous"></script>
    <div class="footer">
        <div class="main">
            <div class="contact">
                <div class="title">
                    <div>   
                        <p class="mini_title">GBA - GLOBAL BROTHER ASSOCIATES</p>
                        <p>Architecture | Interior | Trading</p>
                    </div>
                    <span>Address: No. 88 Thich Quang Duc, Ward 05, Phu Nhuan District, HCMC</span>
                    <span>Phone: 028 22531114 - Mobile: (+84)82 2531104</span>
                    <span>Email: binh@gba.vn</span>
                </div>
                
                <div class="socials">
                    <a class="link" href="https://www.facebook.com/gbavn" style="color: #fff;" target="_blank">
                        <span>Facebook</span>
                    </a>
                    <span> - </span>
                    <a class="link" href="https://maps.app.goo.gl/gZ8cZ5PMHytBiQdY8" style="color: #fff;" target="_blank">
                        <span>Map</span>
                    </a>
                </div>
            </div>

            <div class="border"></div>
            
            <div class="quick_nav">
                <span class="mini_title">Quick Navigation</span>
                <a href="/home/home.html">Home</a>
                <a href="/projects/projects.html">Projects</a>
                <a href="/recruitment/recruitment.html">Recruitment</a>
                <a href="/contact/contact.html">Contacts</a>
            </div>

            <div class="border"></div>

            <div class="quick_projects">
                <span class="mini_title">Our Projects</span>
                <a href="/projects/projects.html?advanced_on=on&name=&client=&from_date=&to_date=&min_size=&max_size=&house=on">Houses</a>
                <a href="/projects/projects.html?advanced_on=on&name=&client=&from_date=&to_date=&min_size=&max_size=&school=on">Schools</a>
                <a href="/projects/projects.html?advanced_on=on&name=&client=&from_date=&to_date=&min_size=&max_size=&office=on">Offices</a>
                <a href="/projects/projects.html?advanced_on=on&name=&client=&from_date=&to_date=&min_size=&max_size=&showroom=on">Showrooms</a>
                <a href="/projects/projects.html?advanced_on=on&name=&client=&from_date=&to_date=&min_size=&max_size=&others=on">Others</a>
            </div>
        </div>
        
        <div class="credits">
            <span>Copyright 2024 Tam Hữu Ltd. All rights reserved.</span>
        </div>
    </div>
    <!-- End footer -->

    <!-- Style -->
    <style>
    /* Footer */
    .footer {
        width: 100%;
        height: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-size: 18px;
        background-color: rgb(40, 40, 40);
        color: rgb(120, 120, 120);
    }
    
    .footer .main {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;
    }
    
    .footer .title {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .footer .mini_title {
        font-size: 25px;
    }
    
    .footer .mini_icon {
        margin-right: 5px;
    }
    
    .footer .socials {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .footer .socials a, span {
        font-size: 18px;
        color: rgb(120, 120, 120);
        text-decoration: none;
    }

    .footer .socials a:hover {
        transform: scale(1.2);
    }

    
    .footer .quick_nav, .quick_projects {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .footer .quick_nav a, .quick_projects a {
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 18px;
        color: rgb(120, 120, 120);
        text-decoration: none;
    }

    .footer .footer_item {
        border-left: 2px solid rgb(120, 120, 120);
        border-right: 2px solid rgb(120, 120, 120);
    }

    .footer .border {
        height: 80%;
        width: 0px;
        border: 1px solid rgb(120, 120, 120);
    }
    </style>
`;

class GBAFooter extends HTMLElement {  
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode : "closed"});
        shadowRoot.appendChild(footer_elements.content);
    }
}

function define_element() {
    customElements.define("gba-footer", GBAFooter);
}

define_element();