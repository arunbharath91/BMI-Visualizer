
class Bmi extends HTMLElement {
  private obese: HTMLElement;
  private overweight: HTMLElement;
  private normal: HTMLElement;
  private underweight: HTMLElement;
  private boxcolor: HTMLElement;
  private tooltip: HTMLElement;
  private template = `<div class="app-container">
      <div class="patient-result shake">
        <h1>Your BMI Result</h1>
        <box-color></box-color>
        <span>${this.getAttribute('value')}</span>
        <sub>(kg/m<sup>2</sup>)</sub>
        <h4>| ${this.getAttribute('gender')}</h4>
      </div>

      <div class="patient-container">
        <div class="header">
          <div class="patient-details-column">
            <label>Weight</label>
            <strong>191<sub>LBS</sub></strong>
          </div>
          <div class="patient-details-column">
            <label>Height</label>
            <strong>5<sup>'</sup>4<sup>''</sup></strong>
          </div>
          <div class="patient-details-column">
            <label>Body Mass Index</label>
            <strong>32.8</strong>
          </div>
        </div>
        <div class="body">
          <p>Body Mass Index Scale</p>

          <div class="button_block">
            <div class="btn-group">
              <tooltip></tooltip>
              <button type="button" class="btn-blue">< 18.5</button>
              <button type="button" class="btn-green">18.5 - 24.99</button>
              <button type="button" class="btn-orange">25 - 29.99</button>
              <button type="button" class="btn-red">> 30</button>
            </div>
          </div>
          <div class="label_block">
            <div>
              <span class="label blue"></span>
              <span class="label-text">UNDERWEIGHT</span>
            </div>
            <div><span class="label green"></span><span class="label-text">NORMAL</span></div>
            <div><span class="label orange"></span><span class="label-text">OVERWEIGHT</span></div>
            <div><span class="label red"></span><span class="label-text">OBESE</span></div>
          </div>

        </div>
      </div>

    <div class="help-view">
      <div class="patient-result">
        <h1>Your Result at a glance :</h1>
      </div>

      <a href="#" data-toggle="tooltip" data-placement="left" title="UNDERWEIGHT">
        <div class="flex-group">
          <span class="glucose-indicator blue"></span>
          <span class="indicator-text">Your glucose level are two high which indicaters diabetes</span>
        </div>
      </a>
      <a href="#" data-toggle="tooltip" data-placement="left" title="NORMAL">
        <div class="flex-group">
          <span class="glucose-indicator green"></span>
          <span class="indicator-text">Your glucose level are two high which indicaters diabetes</span>
        </div>
      </a>
      <a href="#" data-toggle="tooltip" data-placement="left" title="OVERWEIGHT">
        <div class="flex-group">
          <span class="glucose-indicator orange"></span>
          <span class="indicator-text">Your glucose level are two high which indicaters diabetes</span>
        </div>
      </a>
      <a href="#" data-toggle="tooltip" data-placement="left" title="OBESE">
        <div class="flex-group">
          <span class="glucose-indicator red"></span>
          <span class="indicator-text">Your glucose level are two high which indicaters diabetes</span>
        </div>
      </a>
    </div>`;
  constructor() {
    super();
    this.innerHTML = this.template;
    this.obese = (this.querySelector(".btn-red") as HTMLElement);
    this.overweight = (this.querySelector(".btn-orange") as HTMLElement);
    this.normal = (this.querySelector(".btn-green") as HTMLElement);
    this.underweight = (this.querySelector(".btn-blue") as HTMLElement);

    this.boxcolor = (this.querySelector('box-color') as HTMLElement)
    this.tooltip = (this.querySelector('tooltip') as HTMLElement);
  }

  static get observedAttributes() { return ['value', 'gender']; }

  protected connectedCallback() {
    if (this.getAttribute('shadow') && this.getAttribute('shadow') != "false") {
      this.attachShadow({ mode: 'open' });
    }
  }

  protected attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    if (oldValue !== newValue && name === 'value') {
      const attrval = Number(this.getAttribute(name));
      if (attrval >= 30) {
        this.tooltip.innerText = 'OBESE';
        this.boxcolor.style.backgroundColor = '#f84d56';
        this.animateLeft(this.obese.offsetLeft);
      } else if (attrval >= 25 && attrval <= 29.9) {
        this.tooltip.innerText = 'OVERWEIGHT';
        this.boxcolor.style.backgroundColor = '#ffb030';
        this.animateLeft(this.overweight.offsetLeft);
      } else if (attrval >= 18.5 && attrval <= 24.99) {
        this.tooltip.innerText = 'NORMAL';
        this.boxcolor.style.backgroundColor = '#79be3f';
        this.animateLeft(this.normal.offsetLeft);
      } else if (attrval < 18.5) {
        this.tooltip.innerText = 'UNDERWEIGHT';
        this.boxcolor.style.backgroundColor = '#55b9d3';
        this.animateLeft(this.underweight.offsetLeft);
      } else {
        throw new Error('input is not a number')
      }

    }

  }

  private animateLeft(leftPos: number) {
    let pos = 0;
    this.tooltip.style.left = '0';
    const frame = () => {
      if (pos == leftPos) {
        clearInterval(id);
      } else {
        pos++;
        this.tooltip.style.left = `${pos}px`;
      }
    }
    const id = setInterval(frame, 2);

  }

}
window.customElements.define("app-bmi", Bmi);
