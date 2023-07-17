looker.plugins.visualizations.add({
    create: function (element, config) {
        element.innHTML=""
        const imageUrl = 'https://illustoon.com/photo/dl/7502.png';
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        element.appendChild(imgElement);
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        // console.log(element)
        // console.log("wefgq")
        done();
    }
});
