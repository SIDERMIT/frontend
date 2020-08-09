<template>
    <div class="NewCity step1">
        <div class="header">          
            <h1>Add new city</h1>
        </div>
        <section class="step1-definition">
            <div class="grid input-name">
                <h2>Name your city</h2>
                <input type="text" placeholder="Cant be empty"/>
            </div>
            <h2>Definition of city by parameters</h2>
            <div class="grid center subtitle">
                <div class="grid center">
                    <h4>Enter parameters</h4>
                    <a class="icon-link"><span class="material-icons">help</span></a>
                </div>
                <div>
                    <a href="#" class="btn"><span class="material-icons">publish</span><span>Import pajek file</span></a>
                </div>
            </div>
            <div class="table">
                <div class="table-title">
                    <h4>Simetric city's parameters</h4>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><span>𝑛</span></th>
                            <th><span>𝑃[𝑘𝑚]</span></th>
                            <th><span>𝐿[𝑘𝑚]</span></th>
                            <th><span>𝑔</span></th>
                        </tr>
                        <tr>
                            <td><input type="text" placeholder="0"/></td>
                            <td><input type="text" placeholder="0"/></td>
                            <td><input type="text" placeholder="0"/></td>
                            <td><input type="text" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-end">
                <button class="btn"><span class="material-icons">publish</span><span>Edit parameters</span></button>
            </div>
            <button class="btn full main">Raster graph</button>
        </section>
        <section class="step1-graph-editor">
            <h2>Definition of the city by nodes and arcs</h2>
            <h4>Editor</h4>
            <div class="grid g2">
                <div>
                    <div class="editor-container"></div>
                </div>
                <div class="graph-container"></div>
            </div>
            <div class="checker">
                <div class="grid checker-body">
                    <span class="material-icons icon ok">check</span>
                    <span class="text">Table correctly defined</span>
                </div>
                <a href="#" class="btn"><span class="material-icons">get_app</span><span>Download pajek</span></a>
            </div>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content">
                    <a class="btn">
                        <span>Next</span>
                        <span class="material-icons">chevron_right</span>
                    </a>
                </div>
            </div>
        </footer>
        <div class="modal-container">
            <div class="modal">
                <div class="modal-content">
                    <h2>Terminology</h2>
                    <p>The parameters 𝑛, 𝑃, 𝐿 and 𝑔 are required to build the city, the asymmetries are optional</p>
                    <div class="table">
                        <table>
                            <tbody>
                                <tr>
                                    <th><span>Symbol</span></th>
                                    <th><span>Unit</span></th>
                                    <th><span>Description</span></th>
                                </tr>
                                <tr>
                                    <td><span>𝑛</span></td>
                                    <td>&nbsp;</td>
                                    <td><span>Number of zones</span></td>
                                </tr>
                                <tr>
                                    <td><span>𝑃</span></td>
                                    <td>[𝑘𝑚]</td>
                                    <td><span>Total width represented by each arc</span></td>
                                </tr>
                                <tr>
                                    <td><span>𝐿</span></td>
                                    <td>[𝑘𝑚]</td>
                                    <td><span>Distance from SC to the geometrical city center C</span></td>
                                </tr>
                                <tr>
                                    <td><span>𝑔</span></td>
                                    <td>&nbsp;</td>
                                    <td><span>Ratio between the distances P-SC and SC- CBD</span></td>
                                </tr>
                                <tr>
                                    <td><span>𝜂</span></td>
                                    <td>&nbsp;</td>
                                    <td><span>Eccentricity of the CBD</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-container">
            <div class="modal warning">
                <div class="modal-title">
                    <div class="icon">
                        <span class="material-icons">warning</span>
                    </div>
                    <div>
                        <h4>Warning</h4>
                    </div>
                </div>
                <div class="modal-content">
                    <p>Editing the parameters of the symmetric demand will alter the changes in the OD Matrix. Do you want to continue?</p>
                </div>
                <div class="modal-base">
                    <button class="btn solo red">Cancel</button>
                    <button class="btn solo">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NewCity',
  components: {
    
  }
}
</script>
