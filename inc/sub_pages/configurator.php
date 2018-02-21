<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include 'configurator_head.php';
include 'configurator_nav.php';
?>
<div class="configurator-setup">
    Length: <input type="number" id="length" value="500">
    Width: <input type="number" id="width" value="500">
    <!--Height: <input type="number" id="height" value="500">-->
    <button onclick="create_floor()">Create Floor</button>
</div>

<br />
    <p id="message" style="display: none;"></p>
<br />



<div class="configurator-container row col-sm-12">
    <div class="col-sm-7 text-center">
        <canvas id="floor" width="500" height="500" style="outline: 1px solid magenta;">
        </canvas>
    </div>
    <div id="toolbox" class="col-sm-5 text-center row" style="outline: 1px solid magenta; padding: 10px;">

    </div>
</div>
<script type="text/javascript" src="../../js/creator/shapes.js"></script>
<script type="text/javascript" src="../../js/creator/events.js"></script>
<script type="text/javascript" src="../../js/creator/data-handler.js"></script>
<script type="text/javascript" src="../../js/creator/creator.js"></script>
<?php

include '../../index.html';

include '../contact.php';
include '../footer.php';
