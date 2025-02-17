jQuery(function ($) {
  const $header = $(".header");
  const $mv = $(".mv");
  const $body = $("body");

  // MVセクションの高さを取得
  const mvHeight = $mv.outerHeight();

  // スクロールイベントの監視
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();

    if (scrollPosition > mvHeight) {
      $header.addClass("is-scrolled");
    } else {
      $header.removeClass("is-scrolled");
    }
  });

  // ハンバーガーボタンのクリック処理
  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-open");
    $(".js-drawer").fadeToggle();
    $header.toggleClass("is-open");

    // 背面スクロールを禁止・解除
    if ($(this).hasClass("is-open")) {
      $body.addClass("header-no-scroll");
      $("#js-pagetop").addClass("is-hidden");
    } else {
      $body.removeClass("header-no-scroll");
      $("#js-pagetop").removeClass("is-hidden");
    }
  });

  // ドロワーナビ内リンクをクリック時に閉じる処理
  $(".js-drawer a[href]").on("click", function () {
    $(".js-hamburger").removeClass("is-open");
    $(".js-drawer").fadeOut();
    $header.removeClass("is-open");
    $body.removeClass("header-no-scroll");
    $("#js-pagetop").removeClass("is-hidden");
  });

  // ウィンドウリサイズ時の処理
  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").fadeOut();
      $header.removeClass("is-open");
      $body.removeClass("header-no-scroll");
      $("#js-pagetop").removeClass("is-hidden");
    }
  });
});

// mv-swiper
jQuery(function ($) {
  // 現在のURLパスを取得
  const path = window.location.pathname;

  // トップページ（index.html または / のみ）でローディングアニメーションを実行
  if (path === "/" || path === "/index.html") {
    // 初期状態でスワイパー、ローディング画面を非表示
    $(".js-mv-swiper").css("visibility", "hidden");
    $(".js-fv-loading").css("visibility", "hidden");
    $(".header, .js-drawer").css("visibility", "hidden"); // ヘッダーとドロワーを非表示

    // タイトルの黒色表示を制御
    $(".mv__title-wrap").addClass("mv__loading-title");

    // 一定時間後にタイトルの色を戻し、ローディングアニメーションを開始
    setTimeout(function () {
      // タイトルの黒色を解除
      $(".mv__title-wrap").removeClass("mv__loading-title");

      // ローディング画面を表示
      $(".js-fv-loading").css("visibility", "visible");

      // ローディング終了後の処理
      setTimeout(function () {
        $(".js-fv-loading").css("visibility", "hidden"); // フェードアウトせずに非表示
        $(".header, .js-drawer").css("visibility", "visible"); // ヘッダーとドロワーを表示
        $(".js-mv-swiper").css("visibility", "visible"); // スワイパーを表示

        // Swiperを初期化
        const mv_swiper = new Swiper(".js-mv-swiper", {
          loop: true,
          speed: 2000,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
        });
      }, 2500); // ローディングアニメーションの時間
    }, 2500); // タイトル表示後の待機時間
  }
});

// タブ
jQuery(function ($) {
  // ==============================
  // 【情報タブの切り替え処理】
  // ==============================
  function initInformationTabs() {
    const $tabMenu = $(".sub-information-tab .js-tab-menu");
    const $tabContent = $(".sub-information .js-tab-content");

    $tabMenu.on("click", function () {
      const number = $(this).data("number");
      $tabMenu.add($tabContent).removeClass("is-active");
      $(this).addClass("is-active");
      $("#" + number).addClass("is-active");
    });

    // 【追加】情報タブの切り替え処理
    $(".js-tab-menu").on("click", function () {
      const tabNumber = $(this).data("number");
      $(".information-list__item").removeClass("is-active").hide();
      $(`.information-list__item[data-tab='${tabNumber}']`).addClass("is-active").show();
    });
  }

  // ==============================
  // 【共通タブの切り替え処理】
  // ==============================
  function initSubTabs() {
    $(".sub-tab").each(function () {
      const $tabContainer = $(this);
      const $tabMenu = $tabContainer.find(".js-tab-menu");
      const $contentContainer = $tabContainer.next();
      const $contentItems = $contentContainer.find(".js-tab-content");

      // 初期状態で「ALL」タブをアクティブに
      $tabMenu.filter("[data-number='tab01']").addClass("is-active");
      $contentItems.addClass("is-active");

      // タブクリック時の動作
      $tabMenu.on("click", function () {
        const number = $(this).data("number");
        $tabMenu.add($contentItems).removeClass("is-active");
        $(this).addClass("is-active");

        if (number === "tab01") {
          $contentItems.addClass("is-active");
        } else {
          $contentContainer.find(`.js-tab-content[data-tab='${number}']`).addClass("is-active");
        }
      });
    });
  }

  // ==============================
  // 【ナビゲーションクリック時のタブ設定】
  // ==============================
  function handleNavigationClicks() {
    $(".nav__item a").on("click", function (e) {
      const linkText = $(this).text().trim();

      const priceNavItems = ["ライセンス講習", "ファンダイビング", "体験ダイビング"];
      const isPriceNav = $(this).closest(".nav__items").find("a[href='price.html']").length > 0;

      if (isPriceNav && priceNavItems.includes(linkText)) {
        e.preventDefault(); // デフォルトの動作をキャンセル
        window.location.href = "price.html";
        return; // 以降の処理を実行しない
      }

      const tabMapping = {
        ライセンス取得: { tab: "tab02", page: "campaign.html" },
        貸切体験ダイビング: { tab: "tab03", page: "campaign.html" },
        ナイトダイビング: { tab: "tab04", page: "campaign.html" },
        ライセンス講習: { tab: "tab01", page: "information.html" },
        ファンダイビング: { tab: "tab02", page: "information.html" },
        体験ダイビング: { tab: "tab03", page: "information.html" },
      };

      if (tabMapping[linkText]) {
        e.preventDefault(); // 通常のリンク動作を無効化
        sessionStorage.setItem("tab", tabMapping[linkText].tab);
        window.location.href = `${tabMapping[linkText].page}?tab=${tabMapping[linkText].tab}`;
      }
    });
  }

  // ==============================
  // 【タブの適用処理（共通化）】
  // ==============================
  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function handleTabSwitch(tabMenuClass, tabContentClass, contentClass) {
    const activeTab = sessionStorage.getItem("tab") || getQueryParam("tab");
    const currentPage = window.location.pathname.split("/").pop();

    function setActiveTab(tabNumber) {
      $(tabMenuClass + ", " + tabContentClass).removeClass("is-active");
      $(contentClass).hide();

      $(tabMenuClass + `[data-number='${tabNumber}']`).addClass("is-active");
      $(tabContentClass + `[data-tab='${tabNumber}']`).addClass("is-active");

      if (tabNumber === "tab01" && (currentPage === "campaign.html" || currentPage === "voice.html")) {
        $(contentClass).show(); // すべて表示
      } else {
        $(contentClass + `[data-tab='${tabNumber}']`).show();
      }
    }

    if (activeTab) {
      setActiveTab(activeTab);
      sessionStorage.removeItem("tab");
    }

    $(tabMenuClass).on("click", function () {
      setActiveTab($(this).data("number"));
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("tab", $(this).data("number"));
      window.history.replaceState(null, "", newUrl);
    });
  }

  // ==============================
  // 【ページごとのタブ処理】
  // ==============================
  function initPageSpecificTabs() {
    const currentPage = window.location.pathname.split("/").pop();
    const pageTabMapping = {
      "campaign.html": { menu: ".js-tab-menu", content: ".js-tab-content", item: ".sub-campaign-cards__item" },
      "voice.html": { menu: ".js-tab-menu", content: ".js-tab-content", item: ".voice-card-lists__item" },
      "information.html": { menu: ".js-tab-menu", content: ".js-tab-content", item: ".information-list__item" },
    };

    if (pageTabMapping[currentPage]) {
      handleTabSwitch(pageTabMapping[currentPage].menu, pageTabMapping[currentPage].content, pageTabMapping[currentPage].item);
    }
  }

  // ==============================
  // 【実行処理】
  // ==============================
  initInformationTabs();
  initSubTabs();
  handleNavigationClicks();
  initPageSpecificTabs();
});

// campaign-swiper
jQuery(function ($) {
  // スライドの数を取得
  const campaign_slideLength = $(".js-campaign-swiper .swiper-slide").length;

  // スライド数が3未満の場合にスライドを複製して補う
  if (campaign_slideLength < 3) {
    const $swiperWrapper = $(".js-campaign-swiper .swiper-wrapper");

    // 不足分のスライドを複製して追加
    for (let i = 0; i < 3 - campaign_slideLength; i++) {
      $swiperWrapper.append(
        $swiperWrapper
          .children(".swiper-slide")
          .eq(i % campaign_slideLength)
          .clone()
      );
    }
  }

  // 矢印の表示/非表示を制御する関数
  function campaign_arrow() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      $(".js-campaign-arrow").hide();
    } else {
      $(".js-campaign-arrow").show();
    }
  }

  // ウィンドウリサイズ時に矢印の表示を更新
  $(window).resize(campaign_arrow);
  campaign_arrow();

  // Swiper の初期化
  const campaign_swiper = new Swiper(".js-campaign-swiper", {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    spaceBetween: 24,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// アニメーション
$(function () {
  const speed = 700;

  $(".animation").each(function () {
    const $box = $(this);

    // 背景色用の要素を追加
    $box.append('<div class="is-open"></div>');

    const $isOpen = $box.find(".is-open");
    const $image = $box.find("img");
    let triggered = false;

    // スクロールイベントで処理
    $(window).on("scroll", function () {
      if (!triggered && isInView($isOpen)) {
        triggered = true;

        // 背景色を展開
        $isOpen.css("width", "100%");

        // 背景色展開後に画像をフェードイン
        setTimeout(() => {
          $image.css("opacity", "1");
          $isOpen.css({
            left: "0",
            right: "auto",
            width: "0%",
          });
        }, speed);
      }
    });
  });

  // 要素が画面内に入ったかを判定する関数
  function isInView($element) {
    const rect = $element[0].getBoundingClientRect();
    const windowHeight = $(window).height() || $(document).height();

    return rect.top < windowHeight && rect.bottom > 0;
  }
});

// スムーススクロール
$(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const speed = 200;
    let href = $(this).attr("href");
    let target = $(href === "#" || href === "" ? "html" : href);
    let position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
  });
});

// ページトップ
$(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-open");
  } else {
    jQuery("#js-pagetop").removeClass("is-open");
  }
});

// ここから下層ページ

// モーダル
document.addEventListener("DOMContentLoaded", function () {
  const dialogs = document.querySelectorAll("dialog");
  // ダイアログを開く
  const open = document.querySelectorAll(".modal__open-btn");
  open.forEach((button) => {
    button.addEventListener("click", () => {
      const dialogId = button.getAttribute("data-dialog");
      const dialog = document.getElementById(dialogId);
      dialog.showModal();
      dialog.classList.add("js-show");
    });
  });

  // ダイアログを閉じる
  const close = document.querySelectorAll(".modal__close-btn");
  close.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      dialog.classList.remove("js-show");
      dialog.close();
    });
  });

  // オーバーレイクリックでダイアログを閉じる
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target.closest(".modal__inner") === null) {
        dialog.classList.remove("js-show");
        dialog.close();
      }
    });
  });
});

// ブログアコーディオン
jQuery(function ($) {
  // すべてのアーカイブを初期状態で非表示にする
  $(".sub-blog-archive__answer").hide();
  $(".js-faq-question").removeClass("is-open");

  // 2023年の要素だけ開いた状態にする
  $(".sub-blog-archive__link:contains('2023')").nextAll(".sub-blog-archive__answer").show();
  $(".sub-blog-archive__link:contains('2023')").addClass("is-open");

  // クリック時に開閉動作を切り替える
  $(".js-faq-question").on("click", function () {
    if ($(this).hasClass("is-open")) {
      // 開いている場合は閉じる
      $(this).nextAll(".sub-blog-archive__answer").slideUp();
      $(this).removeClass("is-open");
    } else {
      // 閉じている場合は開く
      $(this).nextAll(".sub-blog-archive__answer").slideDown();
      $(this).addClass("is-open");
    }
  });
});

// テーブル切り替え
$(document).ready(function () {
  function adjustTableHeader() {
    const $header = $(".sub-price-list__head");
    if ($(window).width() <= 767) {
      $header.attr("colspan", "3").removeAttr("rowspan");
    } else {
      $header.attr("rowspan", "5").removeAttr("colspan");
    }
  }

  // 初期調整
  adjustTableHeader();

  // ウィンドウサイズ変更時の調整
  $(window).resize(adjustTableHeader);
});

// FAQアコーディオン
jQuery(function ($) {
  $(".js-sub-faq-question").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });
});

// バリデーションエラー処理
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#sub-contact-form");

  if (!form) return; // フォームがないページでは処理を実行しない

  let inName = document.querySelector("#inName");
  let inEmail = document.querySelector("#inEmail");
  let inTextarea = document.querySelector("#inTextarea");
  let inTel = document.querySelector("#inTel");
  let checkboxes = document.querySelectorAll("input[name='sns']");
  let privacyPolicy = document.querySelector("#inPrivacy");
  let errorSummary = document.querySelector("#errorSummary");
  const submitButton = form.querySelector("#button");

  if (!submitButton) return; // 送信ボタンがない場合は処理を中止

  // 統一されたエラーメッセージ
  const REQUIRED_ERROR_MESSAGE = "※必須項目が入力されていません。入力してください。";

  // フォーム送信時の処理
  submitButton.addEventListener("click", function (event) {
    let hasError = false;
    errorSummary.style.display = "none";
    errorSummary.innerHTML = "";

    if (!validateField(inName)) hasError = true;
    if (!validateField(inEmail, (value) => value.includes("@"))) hasError = true;
    if (!validateField(inTextarea)) hasError = true;
    if (!validateField(inTel)) hasError = true;
    if (!validateCheckboxGroup(checkboxes)) hasError = true;
    if (!validateField(privacyPolicy, (value) => value === true)) hasError = true;

    if (hasError) {
      event.preventDefault(); // フォーム送信を中止
      errorSummary.style.display = "block";
      errorSummary.innerHTML = REQUIRED_ERROR_MESSAGE;
      scrollToElement(errorSummary);
    } else {
      event.preventDefault(); // フォーム送信を防ぐ（リダイレクトのため）
      location.href = "thanks.html"; // 成功時にリダイレクト
    }
  });

  // リアルタイムバリデーション（blur、changeイベント）
  inName?.addEventListener("blur", function () {
    validateField(this);
  });

  inEmail?.addEventListener("blur", function () {
    validateField(this, (value) => value.includes("@"));
  });

  inTextarea?.addEventListener("blur", function () {
    validateField(this);
  });

  inTel?.addEventListener("blur", function () {
    validateField(this);
  });

  checkboxes?.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      validateCheckboxGroup(checkboxes);
    });
  });

  privacyPolicy?.addEventListener("change", function () {
    validateField(this, (value) => value === true);
  });

  // 入力フィールドの検証関数
  function validateField(field, condition = (value) => value.trim() !== "") {
    if (!field) return true; // フィールドが存在しない場合は何もしない
    const value = field.type === "checkbox" ? field.checked : field.value;
    if (!condition(value)) {
      field.classList.add("invalid");
      return false;
    } else {
      field.classList.remove("invalid");
      return true;
    }
  }

  // チェックボックスグループの検証関数
  function validateCheckboxGroup(checkboxGroup) {
    if (!checkboxGroup || checkboxGroup.length === 0) return true; // 要素がない場合はスキップ
    const isChecked = Array.from(checkboxGroup).some((checkbox) => checkbox.checked);
    checkboxGroup.forEach((checkbox) => {
      checkbox.classList.toggle("invalid", !isChecked);
    });
    return isChecked;
  }

  // エラー箇所にスクロール
  function scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});
