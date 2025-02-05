import axios, { AxiosInstance } from "axios";

class CrudController<T, X> {
  protected apiClient: AxiosInstance = axios.create({
		baseURL: 'http://localhost:8080',
		timeout: 1000,
	});
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  async create(item: T): Promise<X> {
    try {
		const objectValidated = await this.validateData(item);
      	const response = await this.apiClient.post(`/${this.url}`, objectValidated);
     	return response.data;
    } catch (error) {
      throw error;
    }
  }

	async update(id: number | string, updatedItem: T): Promise<X> {
    try {
		const objectValidated = await this.validateData(updatedItem);
		const response = await this.apiClient.put(
			`/${this.url}/${id}`,
			objectValidated
		);
      	return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
      throw error;
    }
  }

  async getAll(): Promise<X[]> {
    try {
      const response = await this.apiClient.get(`/${this.url}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter os itens:", error);
      throw error;
    }
  }

  async getById(id: number | string): Promise<X> {
    try {
      const response = await this.apiClient.get(`/${this.url}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter o item:", error);
      throw error;
    }
  }

  async delete(id: number | string): Promise<void> {
    try {
      await this.apiClient.delete(`/${this.url}/${id}`);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
      throw error;
    }
  }

	async validateData(item: T): Promise<X | T> {
		return new Promise((resolve, reject) => {
			if (item) {
				resolve(item); // Aqui você pode retornar algo relevante do tipo `X`
			} else {
				reject(reject);
			}
		});
	}
	
}

export default CrudController;
