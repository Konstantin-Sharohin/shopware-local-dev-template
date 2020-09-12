import "./component";
import "./preview";

Shopware.Service("cmsService").registerCmsBlock({
    name: "test-slider-block",
    label: "sw-cms.blocks.image.testSlider.label",
    category: "image",
    component: "sw-cms-block-test-slider",
    previewComponent: "sw-cms-block-preview-test-slider",
    defaultConfig: {
        marginBottom: "20px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        sizingMode: "boxed",
    },
    slots: {
        "test-slider": {
            type: "test-slider-block",
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
});
