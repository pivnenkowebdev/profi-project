const accordeonElement = document.querySelector("#accordeon");
let allItems = null;
const localKey = "accordeonStage";
const defaultStageIndex = "0";

const setBaseStage = () => {
  const indexFromStage = getStageOfAccordeon(localKey);

  if (indexFromStage !== null) {
    setAccordeonStyle(indexFromStage);
  } else {
    setAccordeonStyle(defaultStageIndex);
    setStageOfAccordeon(localKey, defaultStageIndex);
  }
};

const setAccordeonStyle = (currentIndex) => {
  if (currentIndex !== null && currentIndex !== undefined) {
    const isActive = allItems[currentIndex].classList.contains("active");

    allItems.forEach((item) => item.classList.remove("active"));

    if (!isActive) {
      allItems[currentIndex].classList.add("active");
      setStageOfAccordeon(localKey, currentIndex);
    } else {
      setStageOfAccordeon(localKey, null);
      return;
    }
  }
};

const getStageOfAccordeon = (lsKey) => {
  const stage = JSON.parse(localStorage.getItem(lsKey));
  return stage !== null ? String(stage) : null;
};

const setStageOfAccordeon = (lsKey, lsValue) => {
  if (lsKey) {
    localStorage.setItem(lsKey, JSON.stringify(lsValue));
  }
};

const getIndexCurrentElement = (element) => {
  const currentIndex = Array.from(allItems).indexOf(element);
  return String(currentIndex);
};

const eventHandler = (e) => {
  const target = e.target;
  if (target) {
    const headerItemElement = target.closest("[data-header-item]");
    if (headerItemElement) {
      const baseElement = headerItemElement.closest("[data-base]");
      const currentElementIndex = getIndexCurrentElement(baseElement);
      if (currentElementIndex !== null) {
        setStageOfAccordeon(localKey, currentElementIndex);
        setAccordeonStyle(currentElementIndex);
      }
    }
  }
};

if (accordeonElement) {
  accordeonElement.addEventListener("click", (e) => eventHandler(e));
  allItems = accordeonElement.querySelectorAll("[data-base]");
  setBaseStage();
}
