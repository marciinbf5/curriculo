// Inputs principais
const fotoInput = document.getElementById('foto');
const modalConteudo = document.getElementById('modalConteudo');
const previewFotoModal = document.getElementById('previewFotoModal')
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const objetivoInput = document.getElementById('objetivo');
const portfolioInput = document.getElementById('portfolio');
const linkedinInput = document.getElementById('linkedin');
const enderecoInput = document.getElementById('endereço');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const cepInput = document.getElementById('cep');

// Elementos de preview
const previewNome = document.getElementById('previewNome');
const previewEmail = document.getElementById('previewEmail');
const previewTelefone = document.getElementById('previewTelefone');
const previewHabilidade = document.getElementById('previewHabilidade');
const previewExperiencia = document.getElementById('previewExperiencia');
const previewObjetivo = document.getElementById('previewObjetivo');
const previewPortfolio = document.getElementById('previewPortfolio');
const previewLinkedin = document.getElementById('previewLinkedin');
const previewEndereco = document.getElementById('previewEndereço');
const previewCidade = document.getElementById('previewCidade');
const previewEstado = document.getElementById('previewEstado');
const previewCep = document.getElementById('previewCep');
const previewFormacao = document.getElementById('previewFormacao');

// Habilidades
const habilidadeInput = document.getElementById('habilidadeInput');
const addHabilidadeBtn = document.getElementById('addHabilidade');
const listaHabilidades = document.getElementById('listaHabilidades');

// Experiência profissional
const empresaInput = document.getElementById('empresa');
const cargoInput = document.getElementById('cargo');
const descricaoInput = document.getElementById('descricao');
const anoInicio = document.getElementById('anoInicio');
const anoFim = document.getElementById('anoFim');
const atualmenteAqui = document.getElementById('atualmenteAqui');
const addExperienciaBtn = document.getElementById('addExperiencia');

// Formação acadêmica
const instituicaoInput = document.getElementById('instituicao');
const areaFormacaoInput = document.getElementById('areaFormacao');
const descricaoFormacaoInput = document.getElementById('descricaoFormacao');
const anoInicioFormacao = document.getElementById('anoInicioFormacao');
const anoFimFormacao = document.getElementById('anoFimFormacao');
const atualmenteCursando = document.getElementById('atualmenteCursando');
const addFormacaoBtn = document.getElementById('addFormacao');

// Modal e PDF
const modal = document.getElementById('modalPreview');
const closeModalBtn = document.getElementById('closeModal');
const exportPdfBtn = document.getElementById('exportPdf');
const previewContent = document.getElementById('previewContent');

// Arrays para armazenamento
let habilidades = [];
let experiencias = [];
let formacoes = [];
let fotoDataURL = '';

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Preencher anos nos selects
  const anoAtual = new Date().getFullYear();
  for (let i = anoAtual; i >= 1980; i--) {
    [anoInicio, anoFim, anoInicioFormacao, anoFimFormacao].forEach(select => {
      select.add(new Option(i, i));
    });
  }

  // Configurar navegação entre etapas
  let currentStep = 1;
  const steps = document.querySelectorAll(".step");

  function showStep(step) {
    steps.forEach((el) => {
      el.style.display = el.dataset.step == step ? "block" : "none";
    });
  }

  document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });
  seletorTema.classList.add('select-estilizado');
  seletorCorTitulo.classList.add('select-estilizado');


  showStep(currentStep);
});

// Atualização em tempo real dos campos principais
nomeInput.addEventListener('input', updatePreviewNome);
emailInput.addEventListener('input', updatePreviewEmail);
telefoneInput.addEventListener('input', updatePreviewTelefone);
objetivoInput.addEventListener('input', updatePreviewObjetivo);
portfolioInput.addEventListener('input', updatePreviewPortfolio);
linkedinInput.addEventListener('input', updatePreviewLinkedin);
enderecoInput.addEventListener('input', updatePreviewEndereco);
cidadeInput.addEventListener('input', updatePreviewCidade);
estadoInput.addEventListener('input', updatePreviewEstado);
cepInput.addEventListener('input', updatePreviewCep);


function updatePreviewNome() {
  previewNome.textContent = nomeInput.value.trim() || 'Seu Nome Aqui';
}

function updatePreviewEmail() {
  previewEmail.textContent = emailInput.value.trim() 
    ? `Email: ${emailInput.value.trim()}`
    : 'Email: (seu email)';
}

function updatePreviewTelefone() {
  previewTelefone.textContent = telefoneInput.value.trim()
    ? `Telefone: ${telefoneInput.value.trim()}`
    : 'Telefone: (seu telefone)';
}

function updatePreviewObjetivo() {
  previewObjetivo.textContent = objetivoInput.value.trim() || '(seu objetivo profissional)';
}

function updatePreviewPortfolio() {
  previewPortfolio.textContent = portfolioInput.value.trim() || 'Portfolio ou Github:';
}

function updatePreviewLinkedin() {
  previewLinkedin.textContent = linkedinInput.value.trim() || 'Linkedin:';
}

function updatePreviewEndereco() {
  previewEndereco.textContent = enderecoInput.value.trim() || 'Endereço:';
}

function updatePreviewCidade() {
  previewCidade.textContent = cidadeInput.value.trim() || 'Cidade:';
}

function updatePreviewEstado() {
  previewEstado.textContent = estadoInput.value.trim() || 'Estado:';
}

function updatePreviewCep() {
  previewCep.textContent = cepInput.value.trim() || 'CEP:';
}

// Gerenciamento de Habilidades
addHabilidadeBtn.addEventListener('click', adicionarHabilidade);

function adicionarHabilidade() {
  const novaHabilidade = habilidadeInput.value.trim();
  if (novaHabilidade && !habilidades.includes(novaHabilidade)) {
    habilidades.push(novaHabilidade);
    habilidadeInput.value = '';
    renderizarHabilidades();
    atualizarPreviewHabilidades();
  }
}

function renderizarHabilidades() {
  listaHabilidades.innerHTML = '';
  habilidades.forEach((habilidade, index) => {
    const li = document.createElement('li');
    li.textContent = habilidade;
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.style.marginLeft = '10px';
    btnRemover.onclick = () => {
      habilidades.splice(index, 1);
      renderizarHabilidades();
      atualizarPreviewHabilidades();
    };
    
    li.appendChild(btnRemover);
    listaHabilidades.appendChild(li);
  });
}

function atualizarPreviewHabilidades() {
  previewHabilidade.innerHTML = habilidades.length
    ? `<ul style="list-style-type: disc; padding-left: 20px;">${habilidades.map(h => `<li>${h}</li>`).join('')}</ul>`
    : '(Suas habilidades)';
}

// Gerenciamento de Experiências Profissionais
const experienciasContainer = document.createElement('ul');
experienciasContainer.style.marginTop = '10px';
experienciasContainer.style.paddingLeft = '20px';
empresaInput.parentNode.parentNode.appendChild(experienciasContainer);

addExperienciaBtn.addEventListener('click', adicionarExperiencia);
atualmenteAqui.addEventListener('change', () => {
  anoFim.disabled = atualmenteAqui.checked;
});

function adicionarExperiencia() {
  const empresa = empresaInput.value.trim();
  const cargo = cargoInput.value.trim();
  const descricao = descricaoInput.value.trim(); // permanece, mas não obrigatório
  const inicio = anoInicio.value;
  const fim = atualmenteAqui.checked ? 'Atualmente' : anoFim.value;

  if (!empresa || !cargo || !inicio) {
    alert('Por favor, preencha empresa, cargo e ano de início.');
    return;
  }

  if (!atualmenteAqui.checked && !fim) {
    alert('Por favor, selecione o ano de término ou marque "Atualmente trabalho aqui".');
    return;
  }

  experiencias.push({ empresa, cargo, descricao, inicio, fim });
  renderizarExperiencias();
  atualizarPreviewExperiencia();

  // Limpar campos
  empresaInput.value = '';
  cargoInput.value = '';
  descricaoInput.value = '';
  anoInicio.selectedIndex = 0;
  anoFim.selectedIndex = 0;
  atualmenteAqui.checked = false;
  anoFim.disabled = false;
}


function renderizarExperiencias() {
  experienciasContainer.innerHTML = '';
  experiencias.forEach((exp, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '15px';
    li.innerHTML = `
      <strong>${exp.cargo}</strong> em <strong>${exp.empresa}</strong> (${exp.inicio} - ${exp.fim})
      <p>${exp.descricao}</p>
    `;
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.style.marginLeft = '10px';
    btnRemover.onclick = () => {
      experiencias.splice(index, 1);
      renderizarExperiencias();
      atualizarPreviewExperiencia();
    };
    
    li.appendChild(btnRemover);
    experienciasContainer.appendChild(li);
  });
}

function atualizarPreviewExperiencia() {
  previewExperiencia.innerHTML = experiencias.length
    ? experiencias.map(exp => `
        <div style="margin-bottom: 15px;">
          <strong>${exp.cargo}</strong> em <strong>${exp.empresa}</strong><br>
          ${exp.inicio} - ${exp.fim}
          ${exp.descricao ? `<br>${exp.descricao}` : ''}
        </div>
      `).join('')
    : '(Suas experiências profissionais)';
}


// Gerenciamento de Formação Acadêmica
const formacoesContainer = document.createElement('ul');
formacoesContainer.style.marginTop = '10px';
formacoesContainer.style.paddingLeft = '20px';
instituicaoInput.parentNode.parentNode.appendChild(formacoesContainer);

addFormacaoBtn.addEventListener('click', adicionarFormacao);
atualmenteCursando.addEventListener('change', () => {
  anoFimFormacao.disabled = atualmenteCursando.checked;
});

function adicionarFormacao() {
  const instituicao = instituicaoInput.value.trim();
  const area = areaFormacaoInput.value.trim();
  const descricao = descricaoFormacaoInput.value.trim(); // agora opcional
  const inicio = anoInicioFormacao.value;
  const fim = atualmenteCursando.checked ? 'Atual' : anoFimFormacao.value;

  if (!instituicao || !area || !inicio) {
    alert('Por favor, preencha instituição, área e ano de início.');
    return;
  }

  if (!atualmenteCursando.checked && !fim) {
    alert('Por favor, selecione o ano de término ou marque "Atualmente cursando".');
    return;
  }

  formacoes.push({ instituicao, area, descricao, inicio, fim });
  renderizarFormacoes();
  atualizarPreviewFormacao();

  // Limpar campos
  instituicaoInput.value = '';
  areaFormacaoInput.value = '';
  descricaoFormacaoInput.value = '';
  anoInicioFormacao.selectedIndex = 0;
  anoFimFormacao.selectedIndex = 0;
  atualmenteCursando.checked = false;
  anoFimFormacao.disabled = false;
}


function renderizarFormacoes() {
  formacoesContainer.innerHTML = '';
  formacoes.forEach((form, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '15px';
    li.innerHTML = `
      <strong>${form.area}</strong> - ${form.instituicao} (${form.inicio} - ${form.fim})
      <p>${form.descricao}</p>
    `;
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.style.marginLeft = '10px';
    btnRemover.onclick = () => {
      formacoes.splice(index, 1);
      renderizarFormacoes();
      atualizarPreviewFormacao();
    };
    
    li.appendChild(btnRemover);
    formacoesContainer.appendChild(li);
  });
}

function atualizarPreviewFormacao() {
  previewFormacao.innerHTML = formacoes.length
    ? formacoes.map(f => `
        <div style="margin-bottom: 15px;">
          <strong>${f.area}</strong> - ${f.instituicao}<br>
          ${f.inicio} - ${f.fim}
          ${f.descricao ? `<br>${f.descricao}` : ''}
        </div>
      `).join('')
    : '(Suas formações acadêmicas)';
}


// Modal e Geração de PDF
document.getElementById('curriculoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  abrirModal();
});

closeModalBtn.addEventListener('click', fecharModal);
exportPdfBtn.addEventListener('click', gerarPDF);

function abrirModal() {
  previewContent.innerHTML = montarConteudoParaModal();
  previewContent.style.width = '210mm';
  previewContent.style.minHeight = '297mm';
  previewContent.style.padding = '20mm';
  modal.style.display = 'flex';
}

function fecharModal() {
  modal.style.display = 'none';
}

function montarConteudoParaModal() {
  return `
<div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
  <div style="font-family: 'Lora', serif; color: #000; line-height: 1.6; flex: 1 1 60%;">
    <h1 style="font-size: 28pt; margin-bottom: 15px; padding-bottom: 10px;">
      ${nomeInput.value || 'Seu Nome Aqui'}
    </h1>
  </div>
  <div style="flex: 1 1 30%; display: flex; justify-content: flex-end;">
    <img id="previewFoto" src="${fotoDataURL || ''}" alt="Foto do candidato" style="max-width: 150px; max-height: 150px; border-radius: 8px; margin-top: 20px; display: ${fotoDataURL ? 'block' : 'none'};">
  </div>
</div>

<div style="margin-bottom: 20px; font-size: 14pt;">
  ${emailInput.value ? `<p>Email: ${emailInput.value}</p>` : ''}
  ${telefoneInput.value ? `<p>Telefone: ${telefoneInput.value}</p>` : ''}
  ${portfolioInput.value ? `<p>Portfolio: ${portfolioInput.value}</p>` : ''}
  ${linkedinInput.value ? `<p>LinkedIn: ${linkedinInput.value}</p>` : ''}
  ${
    enderecoInput.value || cidadeInput.value || estadoInput.value || cepInput.value
      ? `<p>Endereço: ${enderecoInput.value}, ${cidadeInput.value}, ${estadoInput.value} - ${cepInput.value}</p>`
      : ''
  }
</div>

<h2 style="font-size: 22pt; margin: 25px 0 15px 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
  Objetivo Profissional
</h2>
<p style="font-size: 14pt; text-align: justify;">${objetivoInput.value || ''}</p>

<h2 style="font-size: 22pt; margin: 25px 0 15px 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
  Experiências Profissionais
</h2>
${
  experiencias.length
    ? experiencias
        .map(
          (exp) => `
  <div style="margin-bottom: 20px;">
    <p style="font-weight: bold; font-size: 14pt; margin-bottom: 5px;">
      ${exp.cargo} - ${exp.empresa}
    </p>
    <p style="font-style: italic; margin-bottom: 5px;">
      ${exp.inicio} - ${exp.fim}
    </p>
    <p style="text-align: justify; font-size: 14pt;">
      ${exp.descricao}
    </p>
  </div>
`
        )
        .join('')
    : '<p></p>'
}

<h2 style="font-size: 22pt; margin: 25px 0 15px 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
  Habilidades
</h2>
${
  habilidades.length
    ? `
  <ul style="padding-left: 20px; font-size: 14pt;">
    ${habilidades.map((h) => `<li style="margin-bottom: 8px;">${h}</li>`).join('')}
  </ul>
`
    : '<p></p>'
}

<h2 style="font-size: 22pt; margin: 25px 0 15px 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
  Formação Acadêmica
</h2>
${
  formacoes.length
    ? formacoes
        .map(
          (f) => `
  <div style="margin-bottom: 20px;">
    <p style="font-weight: bold; font-size: 14pt; margin-bottom: 5px;">
      ${f.area} - ${f.instituicao}
    </p>
    <p style="font-style: italic; margin-bottom: 5px;">
      ${f.inicio} - ${f.fim}
    </p>
    <p style="text-align: justify; font-size: 14pt;">
      ${f.descricao}
    </p>
  </div>
`
        )
        .join('')
    : '<p></p>'
}

<!-- Rodapé com copyright -->
<footer style="text-align: center; padding: 30px 10px 10px; font-size: 12pt; color: #555;">
  &copy; 2025 Marcio NBF. Todos os direitos reservados.
</footer>
`;
}



async function gerarPDF() {
  try {
    exportPdfBtn.disabled = true;
    exportPdfBtn.textContent = 'Gerando PDF...';
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Configurações para alta qualidade
    const canvas = await html2canvas(previewContent, {
      scale: 3,
      logging: true,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      letterRendering: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const imgWidth = 210; // Largura A4 em mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('curriculo.pdf');
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
  } finally {
    exportPdfBtn.disabled = false;
    exportPdfBtn.textContent = 'Exportar PDF';
  }
}
const temaSelect = document.getElementById('seletorTema');
const corTituloSelect = document.getElementById('seletorCorTitulo');
const preview = document.getElementById('previewContent');

// Listas das classes possíveis para tema e cor
const temas = ['curriculo-classico', 'curriculo-clean', 'curriculo-minimalista', 'curriculo-despojado', 'curriculo-escuro'];
const cores = ['titulo-azul', 'titulo-verde', 'titulo-vermelho', 'titulo-roxo', 'titulo-preto'];

function aplicarEstilo() {
  // Remove as classes de tema
  temas.forEach(t => preview.classList.remove(t));
  // Remove as classes de cor
  cores.forEach(c => preview.classList.remove(c));

  // Aplica novo tema e cor dos títulos
  const tema = temaSelect.value;
  const cor = corTituloSelect.value;

  preview.classList.add(tema, cor);
}

// Eventos de mudança
temaSelect.addEventListener('change', aplicarEstilo);
corTituloSelect.addEventListener('change', aplicarEstilo);


// Aplicar ao carregar a página
aplicarEstilo();

// JavaScript


fotoInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fotoDataURL = e.target.result;
      previewFoto.src = fotoDataURL;
      previewFoto.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    previewFoto.src = '';
    previewFoto.style.display = 'none';
  }
});

