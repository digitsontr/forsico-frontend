const config = require("../../config");

class Support {
  async createContactTicket(content, fullname, email) {
    return this.createTicket({
      title: "Contact Us",
      content: content,
      language: "en",
      departmentId: 2,
      name: fullname,
      email: email,
    });
  }

  async createTicket(ticketInformation) {
    const myHeaders = new Headers();

    const raw = JSON.stringify({
      title: ticketInformation.title || "",
      content: `<p>${ticketInformation.content}</p>`,
      departmentId: ticketInformation.departmentId || 1,
      language: ticketInformation.language || "en",
      name: ticketInformation.name || "",
      email: ticketInformation.email || "",
      images: ticketInformation.images || 0,
      apiKey: config.supportApiKey || "",
      file: null,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${config.supportApiUrl}/api/ticket/create`,
        requestOptions
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }
}

export default Support;
