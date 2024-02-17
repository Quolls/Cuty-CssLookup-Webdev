<?php include("headerr3.php");?>

<section class="wizard-section">
    <div class="container">
        <div class="row no-gutters">

            <div class="col-lg-12 col-md-12">
                <div class="form-wizard">
                    <form action="" method="post" role="form">
                        <div class="form-wizard-header">

                            <ul class="list-unstyled form-wizard-steps clearfix">
                                <li class="active">
                                    <span></span>
                                    <h2>Start</h2>
                                </li>
                                <li><span>1</span>
                                    <h2>Basic Info</h2>
                                </li>
                                <li><span>2</span>
                                    <h2>Online Application</h2>
                                </li>
                                <li><span>3</span>
                                    <h2>Review and Payment</h2>
                                </li>
                                <li><span></span>
                                    <h2>Complete</h2>
                                </li>
                            </ul>
                        </div>
                        <fieldset class="wizard-fieldset show">
                            <ul class="progresstick start basicinfo">
                                <li class="active"><span></span>
                                    <h4>Start</h4>
                                </li>
                                <li><span>1</span>
                                    <h4>Basic Info</h4>
                                </li>
                                <li><span>2</span>
                                    <h4>Online Application</h4>
                                </li>
                                <li><span>3</span>
                                    <h4>Review and Payment</h4>
                                </li>
                                <li class="active"><span></span>
                                    <h4>Complete</h4>
                                </li>
                            </ul>
                            <div class="row">
                                <div class="secure">
                                    <ul class="site">
                                        <li>
                                            <p>This site is secure and protected.</p>
                                        </li>

                                        <li>
                                            <p> Please Note: This program is not available in Alaska or Louisiana.</p>
                                        </li>

                                        <li>
                                            <p> Please note a Non-Refundable $25.00 convenience fee will apply to all
                                                online transactions
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                If you DO NOT have insurance in force now this policy will become
                                                effective the date the
                                                completed application and payment are received and approved by us or a
                                                later date if
                                                requested.</p>
                                        </li>
                                    </ul>

                                    <div class="businessdetail">
                                        <ul class="detailfilter detail">
                                            <li>
                                                <span>Line of Business</span>
                                                <div class="dropdown apprasers">
                                                    <!--   <a href="#" class="js-link">Accountants Online Application <i
                                        class="fa fa-chevron-down"></i></a> -->
                                                    <select class="js-dropdown-list application">
                                                        <option>
                                                            Accountants Online Application </option>
                                                        <option>
                                                            Express Accountants Online Application</option>
                                                        <option>Appraisers Online Application</option>
                                                        <option>Express Online Application</option>

                                                    </select>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul class="detailfilter statedetail">
                                            <li>
                                                <span>Select your State</span>
                                                <div class="dropdown alabma">
                                                    <!--   <a href="#" class="js-link2">Alabama<i class="fa fa-chevron-down"></i></a> -->
                                                    <select class="js-dropdown-list2 states">
                                                        <option>Alabama</option>
                                                        <option>Arizona</option>
                                                        <option>California</option>

                                                    </select>
                                                </div>
                                            </li>
                                    </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="Businesssection">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="requestedinput">
                                            <form action="#">
                                                <h3>Do you currently have insurance:</h3>
                                                <div class="radiogroup">
                                                    <p>
                                                        <input type="radio" id="test1" name="radio-group" checked>
                                                        <label for="test1">Yes</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="test2" name="radio-group">
                                                        <label for="test2">No</label>
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="requested dates">
                                            <li>
                                                <span>Requested Effective Date</span>
                                                <div class="ui calendar dates" id="example2">
                                                    <div class="ui input left icon">
                                                        <i class="calendar icon new"></i>
                                                        <input type="text" placeholder="mm / dd / yyyy">

                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="continuedetail right">
                                            <button class="btngreen continue"><a href="gapolicynumber.php">CONTINUE
                                                </a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <a href="javascript:;" class="form-wizard-next-btn float-right">Next</a>
                            </div>
                        </fieldset>
                        <fieldset class="wizard-fieldset">
                            <h5>Account Information</h5>
                            <div class="form-group clearfix">
                                <a href="javascript:;" class="form-wizard-previous-btn float-left">Previous</a>
                                <a href="javascript:;" class="form-wizard-next-btn float-right">Next</a>
                            </div>
                        </fieldset>
                        <fieldset class="wizard-fieldset">
                            <h5>Bank Information</h5>

                            <div class="form-group clearfix">
                                <a href="javascript:;" class="form-wizard-previous-btn float-left">Previous</a>
                                <a href="javascript:;" class="form-wizard-next-btn float-right">Next</a>
                            </div>
                        </fieldset>
                        <fieldset class="wizard-fieldset">
                            <h5>Bank Information</h5>

                            <div class="form-group clearfix">
                                <a href="javascript:;" class="form-wizard-previous-btn float-left">Previous</a>
                                <a href="javascript:;" class="form-wizard-next-btn float-right">Next</a>
                            </div>
                        </fieldset>
                        <fieldset class="wizard-fieldset">
                            <h5>Payment Information</h5>

                            <div class="form-group clearfix">
                                <a href="javascript:;" class="form-wizard-previous-btn float-left">Previous</a>
                                <a href="javascript:;" class="form-wizard-submit float-right">Submit</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>



































































































<!-- Home banner -->

<section class="dashboarddirect directonfo">
    <div class="container">
        <ul class="progresstick start basicinfo">
            <li class="active"><span></span>
                <h4>Start</h4>
            </li>
            <li><span>1</span>
                <h4>Basic Info</h4>
            </li>
            <li><span>2</span>
                <h4>Online Application</h4>
            </li>
            <li><span>3</span>
                <h4>Review and Payment</h4>
            </li>
            <li class="active"><span></span>
                <h4>Complete</h4>
            </li>
        </ul>
        <div class="row">
            <div class="secure">
                <ul class="site">
                    <li>
                        <p>This site is secure and protected.</p>
                    </li>

                    <li>
                        <p> Please Note: This program is not available in Alaska or Louisiana.</p>
                    </li>

                    <li>
                        <p> Please note a Non-Refundable $25.00 convenience fee will apply to all online transactions
                        </p>
                    </li>
                    <li>
                        <p>
                            If you DO NOT have insurance in force now this policy will become effective the date the
                            completed application and payment are received and approved by us or a later date if
                            requested.</p>
                    </li>
                </ul>

                <div class="businessdetail">
                    <ul class="detailfilter detail">
                        <li>
                            <span>Line of Business</span>
                            <div class="dropdown apprasers">
                                <!--   <a href="#" class="js-link">Accountants Online Application <i
                                        class="fa fa-chevron-down"></i></a> -->
                                <select class="js-dropdown-list application">
                                    <option>
                                        Accountants Online Application </option>
                                    <option>
                                        Express Accountants Online Application</option>
                                    <option>Appraisers Online Application</option>
                                    <option>Express Online Application</option>

                                </select>
                            </div>
                        </li>
                    </ul>
                    <ul class="detailfilter statedetail">
                        <li>
                            <span>Select your State</span>
                            <div class="dropdown alabma">
                                <!--   <a href="#" class="js-link2">Alabama<i class="fa fa-chevron-down"></i></a> -->
                                <select class="js-dropdown-list2 states">
                                    <option>Alabama</option>
                                    <option>Arizona</option>
                                    <option>California</option>

                                </select>
                            </div>
                        </li>
                </div>
                </ul>
            </div>
        </div>
        <div class="Businesssection">
            <div class="row">
                <div class="col-lg-4">
                    <div class="requestedinput">
                        <form action="#">
                            <h3>Do you currently have insurance:</h3>
                            <div class="radiogroup">
                                <p>
                                    <input type="radio" id="test1" name="radio-group" checked>
                                    <label for="test1">Yes</label>
                                </p>
                                <p>
                                    <input type="radio" id="test2" name="radio-group">
                                    <label for="test2">No</label>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="requested dates">
                        <li>
                            <span>Requested Effective Date</span>
                            <div class="ui calendar dates" id="example2">
                                <div class="ui input left icon">
                                    <i class="calendar icon new"></i>
                                    <input type="text" placeholder="mm / dd / yyyy">

                                </div>
                            </div>
                        </li>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="continuedetail right">
                        <button class="btngreen continue"><a href="gapolicynumber.php">CONTINUE </a></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Optional JavaScript -->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/jquery.fancybox.min.js"></script>
<script src="assets/js/owl.carousel.min.js"></script>
<script src="https://cdn.rawgit.com/mdehoog/Semantic-UI/6e6d051d47b598ebab05857545f242caf2b4b48c/dist/semantic.min.js">
</script>
<script src="assets/js/stats.min.js"></script>
<script src="assets/js/custom.js"></script>
<script>
$('#example2').calendar({
    type: 'date',
});

$('#rangestart').calendar({
    type: 'date',
    endCalendar: $('#rangeend')
});
$('#rangeend').calendar({
    type: 'date',
    startCalendar: $('#rangestart')
});
</script>
</body>

</html>