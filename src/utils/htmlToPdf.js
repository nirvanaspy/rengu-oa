import html2Canvas from 'html2canvas'
import * as jsPDF from 'jspdf'

export default{
    install (Vue, options) {
        Vue.prototype.getPdf = function (id,title) {
            html2Canvas(document.querySelector(`#${id}`), {
                scale: 2,
                // allowTaint: true
                useCORS:true//看情况选用上面还是下面的，
            }).then(function (canvas) {
                    let contentWidth = canvas.width
                    let contentHeight = canvas.height
                    let pageHeight = contentWidth / 552.28 * 841.89
                    let leftHeight = contentHeight
                    let position = 0
                    let imgWidth = 552.28
                    let imgHeight = 552.28 / contentWidth * contentHeight
                    let pageData = canvas.toDataURL('image/jpeg', 1.0)
                    let PDF = new jsPDF('','pt','a4')
                    if (leftHeight < pageHeight) {
                        PDF.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight
                            position -= 841.89
                            if (leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    PDF.save(title + '.pdf')
                }
            )
        },
        Vue.prototype.getPdfLandscape = function (id,title) {
            html2Canvas(document.querySelector(`#${id}`), {
                scale: 2,
                // allowTaint: true
                useCORS:true//看情况选用上面还是下面的，
            }).then(function (canvas) {
                    let contentWidth = canvas.width
                    let contentHeight = canvas.height
                    let pageHeight = contentWidth / 592.28 * 841.89
                    let leftHeight = contentHeight
                    let position = 0
                    let imgWidth = 801.89
                    let imgHeight = 801.89 / contentWidth * contentHeight
                    let pageData = canvas.toDataURL('image/jpeg', 1.0)
                    let PDF = new jsPDF('landscape','pt','a4')
                    if (leftHeight < pageHeight) {
                        PDF.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight
                            position -= 841.89
                            if (leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    PDF.save(title + '.pdf')
                }
            )
        }
    }
}
