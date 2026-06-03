export default function setupEventListener() {
    const length_tab_btn = document.querySelector('.length-tab-btn');
    const weight_tab_btn = document.querySelector('.tab-button.weight-tab-btn');
    const temperature_tab_btn = document.querySelector('.tab-button.temperature-tab-btn');

    const length_tab = document.querySelector('.length-tab');
    const weight_tab = document.querySelector('.weight-tab');
    const temperature_tab = document.querySelector('.temperature-tab');

    length_tab_btn.addEventListener("click", (ev) => {
        length_tab_btn.style.backgroundColor = "rgb(255, 255, 255)";
        weight_tab_btn.style.backgroundColor = "rgb(221, 221, 221)";
        temperature_tab_btn.style.backgroundColor = "rgb(221, 221, 221)";

        length_tab.style.backgroundColor = "rgb(255, 255, 255)";

        length_tab_btn.style.borderBottom = "none";
        weight_tab_btn.style.borderBottom = "0.1px solid rgba(140, 140, 140, 0.1)";
        temperature_tab_btn.style.borderBottom = "0.1px solid rgba(140, 140, 140, 0.1)";        

        length_tab.style.zIndex = "10";
        weight_tab.style.zIndex = "0";
        temperature_tab.style.zIndex = "0";
    });

    weight_tab_btn.addEventListener("click", (ev) => {
        length_tab_btn.style.backgroundColor = "rgb(221, 221, 221)";
        weight_tab_btn.style.backgroundColor = "rgb(255, 255, 255)";
        temperature_tab_btn.style.backgroundColor = "rgb(221, 221, 221)";

        weight_tab.style.backgroundColor = "rgb(255, 255, 255)";

        length_tab_btn.style.borderBottom = "0.1px solid rgba(140, 140, 140, 0.1)";
        weight_tab_btn.style.borderBottom = "none";
        temperature_tab_btn.style.borderBottom = "0.1px solid rgba(140, 140, 140, 0.1)";     

        length_tab.style.zIndex = "0";
        weight_tab.style.zIndex = "10";
        temperature_tab.style.zIndex = "0";
    });

    temperature_tab_btn.addEventListener("click", (ev) => {
        length_tab_btn.style.backgroundColor = "rgb(221, 221, 221)";
        weight_tab_btn.style.backgroundColor = "rgb(221, 221, 221)";
        temperature_tab_btn.style.backgroundColor = "rgb(255, 255, 255)";

        temperature_tab.style.backgroundColor = "rgb(255, 255, 255)";

        length_tab_btn.style.borderBottom = "0.1px solid rgba(140, 140, 140, 0.1)";
        weight_tab_btn.style.borderBottom = "0.1px solid rgba(140, 140, 140, 0.1)";
        temperature_tab_btn.style.borderBottom = "none";     

        length_tab.style.zIndex = "0";
        weight_tab.style.zIndex = "0";
        temperature_tab.style.zIndex = "10";
    });
}