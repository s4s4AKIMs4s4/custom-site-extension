function renderingTemplate(selectors, color, callbackForRedor) {
  selectors.forEach((val) => {
    const allEments = document.querySelectorAll(val);
    callbackForRedor(val, color, allEments);
  });
}

class commonTemplate {
  template = (selector, color, allEments) => {
    allEments.forEach((val, idx) => {
      if (val.children.length === 0)
        val.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
      else if (selector === "yt-formatted-string") {
        return;
      } else {
        if (val.children[0].tagName === "EM")
          val.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
      }
    });
  };

  templateBorderColor = (selector, color) => {
    const allEments = document.querySelectorAll(selector);
    allEments.forEach((val, idx) => {
      val.style.borderColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    });
  };

  templateBackgroundColor = (selector, color) => {
    const allEments = document.querySelectorAll(selector);
    allEments.forEach((val, idx) => {
      val.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    });
  };

  templateOneBackgroundColor = (selector, color) => {
    document.querySelector(selector).style.backgroundColor = color;
  };
}

class Google extends commonTemplate {
  performText(color) {
    const selectors = [
      "span",
      "em",
      ".st",
      '*[data-content-feature="1"] div',
      "h3+div",
      "h3+span",
      'div[role="heading"]'
    ];

    const paintTextHOC = (callback) => {
      return (selector, color, allEments) => {
        if (
          selector === "h3+div" ||
          selector === "a *" ||
          selector === "a" ||
          selector === 'div[role="heading"]' ||
          selector === "h3+span"
        ) {
          for (let i = 0; i < allEments.length; i++) {
            allEments[
              i
            ].style.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
          }
          return;
        }
        callback(selector, color, allEments);
      };
    };

    renderingTemplate(selectors, color, paintTextHOC(this.template));
  }

  performLinks(color) {
    const selectors = ["a", "h3", "cite", "a *", 'div[role="heading"]'];
    renderingTemplate(selectors, color, this.template);
  }

  performInput(color) {
    this.templateBorderColor(".RNNXgb", color);
  }
}

class Youtube extends commonTemplate {
  _scrollUpadtaAlgoritm = null;

  constructor() {
    super();
    this._scrollUpadtaAlgoritm = new ScrollUpadtaAlgoritm();
  }

  performText(color) {
    this._scrollUpadtaAlgoritm.setText(color);
    this._scrollUpadtaAlgoritm.infinityScrollColorUpdate();
  }

  performLinks(color) {
    this._scrollUpadtaAlgoritm.setLink(color);
    this._scrollUpadtaAlgoritm.infinityScrollColorUpdate();
  }

  performInput(color) {
    const selectors = ["#container", "#search-icon-legacy"];
    renderingTemplate(selectors, color, this.templateBorderColor);
  }
}

class ScrollUpadtaAlgoritm extends commonTemplate {
  _text = false;
  _link = false;
  _numberOfPagePassed = 1;
  flag = false;

  paintText() {
    const selectors = [
      "yt-formatted-string",
      "span",
      "h1",
      "#text-container",
      "#content-text",
      "b",
      ".sbsb_c.gsfs",
      "sbqs_c",
      "b",
      ".ytd-video-meta-block",
      "h1 yt-formatted-string",
      "#video-title",
      ".ytd-video-renderer"
    ];

    const paintTextHOC = (callback) => {
      return (selector, color, allEments) => {
          if (
            selector === "yt-formatted-string" ||
            selector === ".ytd-video-meta-block"
          ) {
            for (let i = 0; i < allEments.length; i++) {
              allEments[i].style.color = `rgba(${color.r}, ${color.g}, ${
                color.b
              },${0.7})`;
            }
            return;
          }
        callback(selector, color, allEments);
      };
    };
    renderingTemplate(selectors, this._text, paintTextHOC(this.template));
  }

  paintLink() {
    const selectors = ["a", "yt-icon"];
    renderingTemplate(selectors, this._link, this.template);
  }

  setText(color) {
    this._text = color;
    this.paintText();
  }

  setLink(color) {
    this._link = color;
    this.paintLink();
  }

  paint() {
    if (this._text) {
      this.paintText();
    }
    if (this._link) {
      this.paintLink();
    }
  }

  infinityScrollColorUpdate() {
    document.addEventListener("scroll", (event) => {
      const currentOffset = window.pageYOffset;
      const heightWindows = window.innerHeight;
      const del = Math.floor(currentOffset / heightWindows);

      if (!this.flag) {
        this.paint();
        this.flag = true;
      }

      if (del >= this._numberOfPagePassed) {
        this._numberOfPagePassed++;
        this.paint();
      }
    });
  }
}

class Director {
  _domen;

  constructor(domen) {
    this._domen = domen;
  }

  performArea(area, color) {
    switch (area) {
      case "links":
        this._domen.performLinks(color);
        break;
      case "text":
        this._domen.performText(color);
        break;
      case "input":
        this._domen.performInput(color);
        break;
    }
  }

  performAllArea(areaobj) {
    for (const [area, value] of Object.entries(areaobj)) {
      if (value.pallet === "reset") {
        continue;
      }
      this.performArea(area, value.color);
    }
  }
}

const checkKeysForLength = (state, domain) =>
  Object.keys(state[domain]).length === 0;

const rewriteKeys = (currentDomain) => {
  if (currentDomain.match("www.google")) return "google";
  if (currentDomain.match("www.youtube")) return "youtube";
  else return null;
};

const selectObjectForDomen = (currentDomain, state) => {
  try {
    if (!checkKeysForLength(state, currentDomain)) {
      switch (currentDomain) {
        case "google": {
          return new Google();
        }
        case "youtube":
          return new Youtube();
      }
    } else return null;
  } catch (e) {
    return null;
  }
};

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const currentDomain = rewriteKeys(document.domain);
  domain = selectObjectForDomen(currentDomain, request.state);
  if (domain) {
    director = new Director(domain);
    director.performAllArea(request.state[currentDomain]);
  }
});
