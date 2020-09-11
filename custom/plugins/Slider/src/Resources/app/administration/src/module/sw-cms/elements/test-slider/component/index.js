import template from "./sw-cms-el-test-slider.html.twig";
import "./sw-cms-el-test-slider.scss";

const { Component, Mixin } = Shopware;

Component.register("sw-cms-el-test-slider", {
    template,

    mixins: [Mixin.getByName("cms-element")],

    props: {
        activeMedia: {
            type: [Object, null],
            required: false,
            default: null,
        },
    },

    data() {
        return {
            columnCount: 7,
            columnWidth: 90,
            sliderPos: 0,
            imgPath: "/administration/static/img/cms/preview_plant_small.jpg",
            imgSrc: "",
        };
    },

    computed: {
        gridAutoRows() {
            return `grid-auto-rows: ${this.columnWidth}`;
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        sliderItems() {
            if (
                this.element?.data?.sliderItems &&
                this.element.data.sliderItems.length > 0
            ) {
                return this.element.data.sliderItems;
            }

            return [];
        },

        displayModeClass() {
            if (this.element.config.displayMode.value === "standard") {
                return null;
            }

            return `is--${this.element.config.displayMode.value}`;
        },

        styles() {
            if (
                this.element.config.displayMode.value === "cover" &&
                this.element.config.minHeight.value !== 0
            ) {
                return {
                    "min-height": this.element.config.minHeight.value,
                };
            }

            return {};
        },

        outsideNavArrows() {
            if (this.element.config.navigationArrows.value === "outside") {
                return "has--outside-arrows";
            }

            return null;
        },

        verticalAlignStyle() {
            if (!this.element.config.verticalAlign.value) {
                return null;
            }

            return `align-self: ${this.element.config.verticalAlign.value};`;
        },

        contextAssetPath() {
            return Shopware.Context.api.assetsPath;
        },
    },

    watch: {
        "element.data.sliderItems": {
            handler() {
                if (this.sliderItems.length > 0) {
                    this.imgSrc = this.sliderItems[0].media.url;
                    this.$emit(
                        "active-image-change",
                        this.sliderItems[0].media
                    );
                } else {
                    this.imgSrc = `${this.contextAssetPath}${this.imgPath}`;
                }
            },
            deep: true,
        },

        activeMedia() {
            this.sliderPos = this.activeMedia.sliderIndex;
            this.imgSrc = this.activeMedia.url;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig("test-slider");
            this.initElementData("test-slider");

            if (
                this.element?.data?.sliderItems &&
                this.element.data.sliderItems.length > 0
            ) {
                this.imgSrc = this.sliderItems[0].media.url;
                this.$emit(
                    "active-image-change",
                    this.sliderItems[this.sliderPos].media
                );
            } else {
                this.imgSrc = `${this.contextAssetPath}${this.imgPath}`;
            }
        },

        setSliderItem(mediaItem, index) {
            this.imgSrc = mediaItem.url;
            this.$emit("active-image-change", mediaItem, index);
        },

        activeButtonClass(url) {
            return {
                "is--active": this.imgSrc === url,
            };
        },

        setSliderArrowItem(direction = 1) {
            if (this.sliderItems.length < 2) {
                return;
            }

            this.sliderPos += direction;

            if (this.sliderPos < 0) {
                this.sliderPos = this.sliderItems.length - 1;
            }

            if (this.sliderPos > this.sliderItems.length - 1) {
                this.sliderPos = 0;
            }

            this.imgSrc = this.sliderItems[this.sliderPos].media.url;
            this.$emit(
                "active-image-change",
                this.sliderItems[this.sliderPos].media,
                this.sliderPos
            );
        },
    },
});
