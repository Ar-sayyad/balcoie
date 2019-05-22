<?php include('includes/header-top.php');?>
<style>
.card-body {
    padding: 5px;
    border: 3px solid #2083e4;
    border-radius: 20px;
}
thead tr{
   background-color: #2083e4;
   font-size: 14px;
}
.table td:nth-child(1)
{
    text-align: left;padding-left:30px;
}
.table td{   
    font-size: 14px;
}

.mydata {
    padding: 0px;
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
                <div class="row">                    
                        <div class="col-lg-7">
                        <div class="card mydata">   
                            <div class="card-body"> 
                                    <table id="OverallStationData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 50% !important;text-align: left;padding-left:20px;">Overall Station KPI's</th>
                                            <th style="width: 20% !important;">UOM</th>
                                            <th style="width: 10% !important;">CPP540</th>
                                            <th style="width: 10% !important;">CPP600</th>
                                            <th style="width: 10% !important;">TPP600</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div>
                        
                            <div class="card-body"> 
                                    <table id="cpp540Data" class="display nowrap table table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 50% !important;text-align: left;padding-left:20px;">CPP - 540 KPI's</th>
                                            <th style="width: 10% !important;">UOM</th>
                                            <th style="width: 10% !important;">Unit-1</th>
                                            <th style="width: 10% !important;">Unit-2</th>
                                            <th style="width: 10% !important;">Unit-3</th>
                                            <th style="width: 10% !important;">Unit-4</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div>
                        
                            <div class="card-body"> 
                                    <table id="PowerPlant1200Data" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                           <th style="width: 50% !important;text-align: left;padding-left:20px;">Power Plant - 1200MW KPI's</th>
                                            <th style="width: 10% !important;">UOM</th>
                                            <th style="width: 10% !important;">Unit-1</th>
                                            <th style="width: 10% !important;">Unit-2</th>
                                            <th style="width: 10% !important;">Unit-3</th>
                                            <th style="width: 10% !important;">Unit-4</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div> 
                        <div class="col-lg-5">
                        <div class="card mydata">   
                            <div class="card-body"> 
                                    <table id="cpp2CEMSData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 55% !important;text-align: left;padding-left:20px;">CPP2 CEMS KPI's</th>
                                            <th style="width: 15% !important;">UOM</th>
                                            <th style="width: 10% !important;">PM</th>
                                            <th style="width: 10% !important;">NOx</th>
                                            <th style="width: 10% !important;">SOx</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div>   
                            <div class="card-body"> 
                                    <table id="PP1200CEMSData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 55% !important;text-align: left;padding-left:20px;">PP - 1200 CEMS</th>
                                            <th style="width: 15% !important;">UOM</th>
                                            <th style="width: 10% !important;">PM</th>
                                            <th style="width: 10% !important;">NOx</th>
                                            <th style="width: 10% !important;">SOx</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div>  
                            <div class="card-body"> 
                                    <table id="FuelStockConsumptionData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 55% !important;text-align: left;padding-left:20px;">Fuel Stock & Consumption</th>
                                            <th style="width: 15% !important;">UOM</th>
                                            <th style="width: 10% !important;">CPP540</th>
                                            <th style="width: 10% !important;">IPP600</th>
                                            <th style="width: 10% !important;">CPP600</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div> 
                            <div class="card-body"> 
                                    <table id="WaterConsumptionData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 55% !important;text-align: left;padding-left:20px;">Water Consumption</th>
                                            <th style="width: 15% !important;">UOM</th>
                                            <th style="width: 10% !important;">CPP540</th>
                                            <th style="width: 10% !important;">IPP600</th>
                                            <th style="width: 10% !important;">CPP600</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div> 
                            <div class="card-body"> 
                                    <table id="ExportImportData" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                           <tr>
                                            <th style="width: 55% !important;text-align: left;padding-left:20px;">Export & Import</th>
                                            <th style="width: 15% !important;">UOM</th>
                                            <th style="width: 10% !important;">CPP540</th>
                                            <th style="width: 10% !important;">IPP600</th>
                                            <th style="width: 10% !important;">CPP600</th>
                                           </tr>
                                        </thead>
                                        <tbody id="sortTable">
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>    
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
<script src="<?php echo base_url();?>piadmin/js/dashboard2.js" type="text/javascript"></script>
<!-- Chart code -->
</body>
</html>