import "./component";
import "./preview";

Shopware.Service("cmsService").registerCmsBlock({
    name: "test-slider",
    label: "A test slider",
    category: "image",
    component: "sw-cms-block-test-slider",
    previewComponent: "sw-cms-preview-test-slider",
    defaultConfig: {
        marginBottom: "20px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        sizingMode: "boxed",
    },
    slots: {
        imageSlider: "image-slider",
    },
});
