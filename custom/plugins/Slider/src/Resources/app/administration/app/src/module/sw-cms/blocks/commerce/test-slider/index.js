import "../../component";
import "../../preview";

Shopware.Service("cmsService").registerCmsBlock({
    name: "test-slider",
    label: "sw-cms.blocks.commerce.testSlider.label",
    category: "commerce",
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
        productSlider: "product-slider",
    },
});
