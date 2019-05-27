<?php include('includes/header-top.php');?>
<style>
.table td:nth-child(2), .table th:nth-child(2)
{
    text-align: left;padding-left:20px;
}
.page-titles {
    background: #ffffff;
    margin: 0px 0 0px;
    display: none;
}
.container-fluid {
    background-color: #919497;
}
.mydata {
    padding: 5px;
        margin-top: 25px;
    border-radius: 3px;
    box-shadow: 5px 5px 12px rgb(158, 157, 157);
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
               <div class="col-12">
                  <div class="card mydata">
                     <div class="card-body">
                        <div class="table-responsive">
                           <table id="plantHead" class="display nowrap table table-striped  table-bordered" cellspacing="0" width="100%">
                              <thead>
                                 <tr style="background-color: #2177cd;">
                                    <th rowspan="2" style="width: 5% important;">S.No</th>
                                    <th rowspan="2" style="width: 25% important;">KPI's - Plant Performance</th>
                                    <th rowspan="2" style="width: 10% important;">UOM</th>
                                    <th colspan="2" style="width: 20% important;">CPP 540 MW</th>
                                    <th colspan="2" style="width: 20% important;">CPP 600 MW</th>
                                    <th colspan="2" style="width: 20% important;">IPP 600 MW</th>
                                 </tr>
                                 <tr style="background-color: #2177cd;">                                         
                                    <th style="width: 10% important;">BP</th>
                                    <th style="width: 10% important;">ACT</th>
                                    <th style="width: 10% important;">BP</th>
                                    <th style="width: 10% important;">ACT</th>
                                    <th style="width: 10% important;">BP</th>
                                    <th style="width: 10% important;">ACT</th>
                                 </tr>
                              </thead>
                              <tbody></tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
             <div class="printdiv">
                        <button type="button" id="printBtn" class="btn btn-primary  sbmt-btn"><i class="ti-printer"></i> Print</button>
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
   <script src="<?php echo base_url();?>piadmin/js/PlantHead.js" type="text/javascript"></script>
    <!-- Chart code -->
</body>
</html>