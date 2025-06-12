export interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

export interface IBGECity {
  id: number;
  nome: string;
}

export interface StateOption {
  value: string;
  label: string;
}

export interface CityOption {
  value: string;
  label: string;
}

// Brazilian states data
const BRAZILIAN_STATES: IBGEState[] = [
  { id: 12, sigla: 'AC', nome: 'Acre' },
  { id: 27, sigla: 'AL', nome: 'Alagoas' },
  { id: 16, sigla: 'AP', nome: 'Amapá' },
  { id: 13, sigla: 'AM', nome: 'Amazonas' },
  { id: 29, sigla: 'BA', nome: 'Bahia' },
  { id: 23, sigla: 'CE', nome: 'Ceará' },
  { id: 53, sigla: 'DF', nome: 'Distrito Federal' },
  { id: 32, sigla: 'ES', nome: 'Espírito Santo' },
  { id: 52, sigla: 'GO', nome: 'Goiás' },
  { id: 21, sigla: 'MA', nome: 'Maranhão' },
  { id: 51, sigla: 'MT', nome: 'Mato Grosso' },
  { id: 50, sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { id: 31, sigla: 'MG', nome: 'Minas Gerais' },
  { id: 15, sigla: 'PA', nome: 'Pará' },
  { id: 25, sigla: 'PB', nome: 'Paraíba' },
  { id: 41, sigla: 'PR', nome: 'Paraná' },
  { id: 26, sigla: 'PE', nome: 'Pernambuco' },
  { id: 22, sigla: 'PI', nome: 'Piauí' },
  { id: 33, sigla: 'RJ', nome: 'Rio de Janeiro' },
  { id: 24, sigla: 'RN', nome: 'Rio Grande do Norte' },
  { id: 43, sigla: 'RS', nome: 'Rio Grande do Sul' },
  { id: 11, sigla: 'RO', nome: 'Rondônia' },
  { id: 14, sigla: 'RR', nome: 'Roraima' },
  { id: 42, sigla: 'SC', nome: 'Santa Catarina' },
  { id: 35, sigla: 'SP', nome: 'São Paulo' },
  { id: 28, sigla: 'SE', nome: 'Sergipe' },
  { id: 17, sigla: 'TO', nome: 'Tocantins' }
];

export const getStates = (): StateOption[] => {
  const allStatesOption: StateOption = { value: '', label: 'Todos os estados' };
  const stateOptions: StateOption[] = BRAZILIAN_STATES.map(state => ({
    value: state.sigla,
    label: state.nome
  }));
  
  return [allStatesOption, ...stateOptions];
};

export const getCitiesByState = async (stateCode: string): Promise<CityOption[]> => {
  if (!stateCode) {
    return [{ value: '', label: 'Todas as cidades' }];
  }

  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    
    const cities: IBGECity[] = await response.json();
    
    const allCitiesOption: CityOption = { value: '', label: 'Todas as cidades' };
    const cityOptions: CityOption[] = cities
      .map(city => ({
        value: city.nome.toLowerCase().replace(/\s+/g, '-'),
        label: city.nome
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    
    return [allCitiesOption, ...cityOptions];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [{ value: '', label: 'Todas as cidades' }];
  }
};