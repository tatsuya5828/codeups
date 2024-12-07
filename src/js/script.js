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
  const mv_swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
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
