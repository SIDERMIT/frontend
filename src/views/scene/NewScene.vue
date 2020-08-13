<template>
  <div class="NewScene">
    <div class="header">          
        <h1>Add new scene</h1>
        <p class="min">City 1</p>
    </div>
    <section class="scene-definition">
        <div>
            <div class="def-box">
                <h2>Name your scene</h2>
                <input type="text" placeholder="Cant be empty"/>
            </div>
            <div>
                <h2>Define transport user</h2>
                <div class="subtitle">
                    <div class="grid">
                        <h4>User settings</h4>
                        <a class="icon-link"><span class="material-icons">help</span></a>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                                <th><span>𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                                <th><span>𝑠𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                                <td><input type="text" placeholder="0"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ckecher">
                    </div>
                </div>
            </div>
        </div>
        <div class="graph-container"></div>
    </section>
    <section class="scene-modes">
        <h2>Define transportation modes</h2>
        <div class="subtitle">
            <div class="grid">
                <h4>Add or remove all transportation modes that the city will have</h4>
                <a class="icon-link"><span class="material-icons">help</span></a>
            </div>
        </div>
        <div class="table">
            <table>
                <tbody>
                    <tr>
                        <th>&nbsp;</th>
                        <th><span>Mode</span></th>
                        <th><span>𝐶𝑜<br>[$/h−𝑣𝑒h]</span></th>
                        <th><span>𝐶1<br>[$/h−𝑝𝑎𝑥]</span></th>
                        <th><span>𝐶2<br>[$/h−𝑘𝑚]</span></th>
                        <th><span>𝜈<br>[𝑘𝑚/h]</span></th>
                        <th><span>B&A<br>Sequential</span></th>
                        <th><span>𝑡<br>[𝑠/𝑝𝑎𝑥]</span></th>
                        <th><span>fini<br>[veh/hr]</span></th>
                        <th><span>𝑓𝑚𝑎𝑥<br>[𝑣𝑒h/h]</span></th>
                        <th><span>𝐾𝑚𝑎𝑥<br>[𝑝𝑎𝑥/𝑣𝑒h]</span></th>
                        <th><span>𝜃</span></th>
                        <th><span>𝑡𝑎𝑡<br>[𝑚𝑖𝑛]</span></th>
                        <th><span>𝐷</span></th>
                        <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                    </tr>
                    <tr>
                        <td><button class="btn icon" alt="delete"><span class="material-icons">delete</span></button></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <div class="switch-body">
                                </div>
                            </label>
                        </td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td><button class="btn icon" alt="delete"><span class="material-icons">delete</span></button></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <div class="switch-body">
                                </div>
                            </label>
                        </td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                    </tr>
                </tbody>
            </table>
            <div class="checker">
                <div></div>
                <button class="btn"><span class="material-icons">add</span><span>Add mode</span></button>
            </div>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <button class="btn" @click="createCity">
                    <span>Save and continue</span>
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NewScene',
  components: {
    
  }
}
</script>
