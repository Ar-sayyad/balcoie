<?php include('includes/header-top.php');?>
<style>
    thead tr {
        background-color: #1771ca;
        font-size: 14px;
    }

    .table td:nth-child(1) {
        text-align: left;
        padding-left: 15px;
    }

    .table td {
        font-size: 14px;
    }

    .mydata {
        padding: 5px;
        margin: 5px;
        border-radius: 3px;
        box-shadow: 5px 5px 12px rgb(158, 157, 157);
    }
    .row{
        padding-top: 5px;
    }
    .container-fluid {
        background-color: #919497;
    }

    .page-titles {
        background: #ffffff;
        margin: 0px 0 0px;
        display: none;
    }

    .table > thead > tr > th {
        font-weight: 600;
    }

    .col-lg-5, .col-lg-6, .col-lg-7 {
        padding-right: 0px;
        padding-left: 0px;
    }

    .marginlg {
        margin-bottom: 10px;
    }

    .toptr {
        background-color: #e7e7e7;
        text-align: center !important;
    }
    .topth{
           color:#1c334b !important;
           text-align: center !important;
    }
    .dataTables_wrapper {
        padding-top: 0px;
    }
    .printdiv{
          padding-bottom: 25px;  
    }
    #printBtn{
       float: right;
       box-shadow: 5px 5px 12px #000000; 
       border: 1px solid #6257a6;
    }
</style>
<body class="fix-header fix-sidebar">
   <?php include('includes/preloader.php');?>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
        <?php include('includes/header.php');?>
        <!-- End header header -->
        <!-- Left Sidebar  -->
        <div class="left-sidebar">
            <!-- Sidebar scroll-->
           <?php include('includes/sidebar.php');?>
            <!-- End Sidebar scroll-->
        </div>
        <!-- End Left Sidebar  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper">
            <!-- Bread crumb -->
           <?php include('includes/titlebar.php');?>
            <!-- End Bread crumb -->
            <!-- Container fluid  -->
            <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row printPage" id="printPage">
    <div class="col-lg-7">
        <div class="card mydata">
            <div class="card-body">
                <table id="OverallStationData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="5" class="topth">Overall Station KPIs</th>
                        </tr>
                        <tr>
                            <th style="width: 35% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 20% !important;">UOM</th>
                            <th style="width: 15% !important;">CPP540</th>
                            <th style="width: 15% !important;">IPP600</th>
                            <th style="width: 15% !important;">CPP600</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>
        <div class="card mydata">
            <div class="card-body">
                <table id="cpp540Data" class="display nowrap table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="6" class="topth">CPP 540MW KPIs</th>
                        </tr>
                        <tr>
                            <th style="width: 30% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 14% !important;">UOM</th>
                            <th style="width: 14% !important;">Unit-1</th>
                            <th style="width: 14% !important;">Unit-2</th>
                            <th style="width: 14% !important;">Unit-3</th>
                            <th style="width: 14% !important;">Unit-4</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>
        <div class="card mydata">
            <div class="card-body">
                <table id="PowerPlant1200Data" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="6" class="topth">Power Plant 1200MW KPIs</th>
                        </tr>
                        <tr>
                            <th style="width: 30% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 14% !important;">UOM</th>
                            <th style="width: 14% !important;">Unit-1</th>
                            <th style="width: 14% !important;">Unit-2</th>
                            <th style="width: 14% !important;">Unit-3</th>
                            <th style="width: 14% !important;">Unit-4</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-lg-5">
        <div class="card mydata marginlg">
            <div class="card-body">
                <table id="cpp2CEMSData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="5" class="topth">CPP2 CEMS KPIs</th>
                        </tr>
                        <tr>
                            <th style="width: 35% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 20% !important;">UOM</th>
                            <th style="width: 15% !important;">PM</th>
                            <th style="width: 15% !important;">NOx</th>
                            <th style="width: 15% !important;">SOx</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>
        <div class="card mydata marginlg">
            <div class="card-body">
                <table id="PP1200CEMSData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="5" class="topth">PP1200 CEMS KPIs</th>
                        </tr>
                        <tr>
                            <th style="width: 35% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 20% !important;">UOM</th>
                            <th style="width: 15% !important;">PM</th>
                            <th style="width: 15% !important;">NOx</th>
                            <th style="width: 15% !important;">SOx</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>
        <div class="card mydata marginlg">
            <div class="card-body">
                <table id="FuelStockConsumptionData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="5" class="topth">Fuel Stock & Consumption</th>
                        </tr>
                        <tr>
                            <th style="width: 35% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 20% !important;">UOM</th>
                            <th style="width: 15% !important;">CPP540</th>
                            <th style="width: 15% !important;">IPP600</th>
                            <th style="width: 15% !important;">CPP600</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>
        <div class="card mydata marginlg">
            <div class="card-body">
                <table id="WaterConsumptionData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr class="toptr">
                            <th colspan="5" class="topth">Other Parameters</th>
                        </tr>
                        <tr>
                            <th style="width: 35% !important;text-align: left;padding-left:20px;">Parameters</th>
                            <th style="width: 20% !important;">UOM</th>
                            <th style="width: 15% !important;">CPP540</th>
                            <th style="width: 15% !important;">IPP600</th>
                            <th style="width: 15% !important;">CPP600</th>
                        </tr>
                    </thead>
                    <tbody id="sortTable"></tbody>
                </table>
            </div>
        </div>

    </div>
</div> 
                <div class="printdiv">
                        <button type="button"  id="printBtn" class="btn btn-primary  sbmt-btn"><i class="ti-printer"></i> Print</button>
                </div>

                <!-- End PAge Content -->
            </div>
            <!-- End Container fluid  -->
            <!-- footer -->
              <?php include('includes/footer.php');?>
            <!-- End footer -->
        </div>
        <!-- End Page wrapper  -->
    </div>
    <!-- End Wrapper -->
    <!-- All Jquery -->
    <?php include('includes/footer-min.php');?>
     <!-- Styles -->
<!-- Chart code -->
<script src="<?php echo base_url();?>piadmin/js/jquery.PrintArea.js" type="text/javascript"></script>
<script src="<?php echo base_url();?>piadmin/js/dashboard2_fullcode.js" type="text/javascript"></script>
<!-- Chart code -->
</body>
</html>