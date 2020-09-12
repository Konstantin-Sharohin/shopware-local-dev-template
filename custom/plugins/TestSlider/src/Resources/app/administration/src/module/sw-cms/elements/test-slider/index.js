import "./component";
import "./config";
import "./preview";

Shopware.Service("cmsService").registerCmsElement({
    name: "test-slider",
    label: "sw-cms.elements.testSlider.label",
    category: "image",
    component: "sw-cms-el-test-slider",
    configComponent: "sw-cms-el-config-test-slider",
    previewComponent: "sw-cms-el-preview-test-slider",
    defaultConfig: {
        sliderItems: {
            source: "static",
            value: [],
            required: true,
            entity: {
                name: "media",
            },
        },
        navigationArrows: {
            // null, inside, outside
            source: "static",
            value: "inside",
        },
        navigationDots: {
            // null, inside, outside
            source: "static",
            value: "inside",
        },
        displayMode: {
            // standard, cover, contain
            source: "static",
            value: "standard",
        },
        minHeight: {
            source: "static",
            value: "300px",
        },
        // verticalAlign: {
        //     source: "static",
        //     value: null,
        // },
    },
    slots: {
        "test-slider": {
            type: "test-slider",
            default: {
                config: {
                    displayMode: { source: "static", value: "cover" },
                },
                data: {
                    media: {
                        url:
                            "/administration/static/img/cms/preview_camera_large.jpg",
                    },
                },
            },
        },
    },

    enrich: function enrich(elem, data) {
        if (Object.keys(data).length < 1) {
            return;
        }

        Object.keys(elem.config).forEach((configKey) => {
            const entity = elem.config[configKey].entity;

            if (!entity) {
                return;
            }

            const entityKey = entity.name;
            if (!data[`entity-${entityKey}`]) {
                return;
            }

            elem.data[configKey] = [];
            elem.config[configKey].value.forEach((sliderItem) => {
                elem.data[configKey].push({
                    newTab: sliderItem.newTab,
                    url: sliderItem.url,
                    media: data[`entity-${entityKey}`].get(sliderItem.mediaId),
                });
            });
        });
    },
});
