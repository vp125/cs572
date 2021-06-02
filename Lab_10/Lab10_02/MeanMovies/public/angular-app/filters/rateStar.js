angular.module("meanMovies").filter("rateToStar", rateToStar);
function rateToStar() {
    return function (number) {
        if (number && !isNaN(number)) {
            let stars = "";
            switch (number) {
                case 1:
                    stars = "*";
                    break;
                case 2:
                    stars = "* *";
                    break;
                case 3:
                    stars = "* * *";
                    break;
                case 4:
                stars = "* * * *";
                break;
                case 5:
                stars = "* * * * *";
                break;
                default:
                    stars = "";
                    break;
            }
            return stars;
        }
        return "";
    }
}